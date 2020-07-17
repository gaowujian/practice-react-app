import React from "react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import createSagaMiddleware from "redux-saga";
import * as sagaEffects from "redux-saga/effects";
import { createHashHistory } from "history";
export { connect };

export default function () {
  const app = {
    // 存放定义的模型
    _models: [],
    model,
    // 存放路由定义函数
    _router: null,
    router,
    start,
  };
  function model(model) {
    app._models.push(model);
  }
  function router(routerConfig) {
    app._router = routerConfig;
  }
  function start(containerId) {
    let reducers = {
      number: 20,
    };
    for (let i = 0; i < app._models.length; i++) {
      const model = app._models[i];
      reducers[model.namespace] = function (state = model.state, action) {
        let actionType = action.type; //取得动作类型
        let [namespace, type] = actionType.split("/");
        // 如果相同就需要去处理
        if (model.namespace === namespace) {
          // 获得对应的装填处理函数
          let reducer = model.reducers[type];
          if (reducer) {
            return reducer(state, action);
          }
        }
        return state;
      };
    }
    let rootReducer = combineReducers(reducers);
    let sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    function* rootSaga(params) {
      const { takeEvery } = sagaEffects;
      for (const model of app._models) {
        const effects = model.effects;
        for (const key in effects) {
          // key = asynadd
          yield takeEvery(`${model.namespace}/${key}`, function* (action) {
            yield effects[key](action, sagaEffects);
          });
        }
      }
    }
    sagaMiddleware.run(rootSaga);
    let history = createHashHistory();
    const App = app._router({ history });

    // function HOC(App) {
    //   return class HOCComponent extends React.Component {
    //     constructor(props) {
    //       super(props);
    //     }
    //     render() {
    //       console.log(App);
    //       return <div>{App}</div>;
    //     }
    //     componentDidMount() {
    //       console.log("jianting");
    //       this.props.history.listen(() => {
    //         this.setState();
    //       });
    //     }
    //   };
    // }

    ReactDOM.render(
      <Provider store={store}>{App}</Provider>,
      document.querySelector(containerId)
    );
  }
  return app;
}

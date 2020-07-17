import React from "react";
import { combineReducers, createStore } from "redux";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
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
    const store = createStore(rootReducer);
    const App = app._router();
    ReactDOM.render(
      <Provider store={store}>{App}</Provider>,
      document.querySelector(containerId)
    );
  }
  return app;
}

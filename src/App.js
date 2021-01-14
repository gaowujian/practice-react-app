import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import routeConfig from "./routes/route-config.json";
import * as Routes from "./routes";
import "./style.css";
function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName="active" to="/" exact className="nav_link">
              首页
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/login" className="nav_link">
              登陆页
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/user" className="nav_link">
              用户管理
            </NavLink>
          </li>
        </ul>
      </nav>

      <main>
        <Switch>
          {routeConfig.routes.map((routeItem) => {
            return (
              <Route
                path={routeItem.path}
                exact={routeItem.exact}
                component={Routes[routeItem.component]}
                key={routeItem.path}
              ></Route>
            );
          })}
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;

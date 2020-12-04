import React from "react";
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import "./app.css";

import ReactMotion from "./components/ReactMotion";
import ReactSpring from "./components/ReactSpring";
import ReactAnimation from "./components/ReactAnimation";
import CssAnimation from "./components/CssAnimation";
function App() {
  return (
    <Router>
      <div className="container">
        <nav className="left">
          <ul>
            <li>
              <Link to="/css-animation">css-animation</Link>
            </li>
            <li>
              <Link to="/react-motion">react-motion</Link>
            </li>
            <li>
              <Link to="/react-spring">react-spring</Link>
            </li>
            <li>
              <Link to="/react-animation">react-animation</Link>
            </li>
          </ul>
        </nav>
        <main className="right">
          <Switch>
            <Route path="/css-animation" exact>
              <CssAnimation />
            </Route>
            <Route path="/react-motion" exact>
              <ReactMotion />
            </Route>
            <Route path="/react-spring" exact component={ReactSpring}></Route>
            <Route
              path="/react-animation"
              exact
              component={ReactAnimation}
            ></Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

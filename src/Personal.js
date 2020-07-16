import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Info from "index";
import Login from "index";
import Register from "index";

export default function Personal() {
  console.log("用户");
  return (
    // <Router>
    //   <Switch>
    //     <Route path="/pp" exact component={Info} />
    //     <Route path="/personal/register" component={Register} />
    //     <Route path="/personal/login" component={Login} />
    //   </Switch>
    // </Router>
    <Route></Route>
  );
}

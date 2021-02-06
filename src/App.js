import React from "react";
import Common from "./components/Common";
import Navigation from "./components/Navigation";
import { HashRouter as Router } from "react-router-dom";

import "./style.css";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="demo-area">
          {/* <Common /> */}
          <Navigation />
        </div>
      </div>
    </Router>
  );
}

export default App;

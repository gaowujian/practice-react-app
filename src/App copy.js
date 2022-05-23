import React from "react";
import LazyLoad from "react-lazyload";
import city1 from "./images/city1.jpg";
import city2 from "./images/city2.jpg";
import city3 from "./images/city3.jpg";
import city4 from "./images/city4.jpg";

const App = () => {
  return (
    <div>
      <div className="list">
        <LazyLoad height={600}>
          <img src={city1} alt="city1" />
        </LazyLoad>

        <LazyLoad height={600}>
          <img src={city2} alt="city2" />
        </LazyLoad>
        <LazyLoad height={600}>
          <img src={city3} alt="city3" />
        </LazyLoad>
        <LazyLoad height={600}>
          <img src={city4} alt="city4" />
        </LazyLoad>
      </div>
    </div>
  );
};

export default App;

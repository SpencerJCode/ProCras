import { useState } from "react";

const Home = (props) => {
  return (
    <div className="">
      <div className="card-test m-auto mt-5">
        <div className="hover-card test-card">
          <div className="hover-card-content">
          <h1>Hover over me!</h1>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="scene scene--flip-card hover-effect">
          <div className="flip-card">
            <div className="flip-card__face flip-card__face--front">
              <h1>Hover over me and click me!</h1>
              <p></p>
              <h5>Front</h5>
            </div>
            <div className="flip-card__face flip-card__face--back">
              <h1>Click me again!</h1>
              <p></p>
              <h5>Back</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

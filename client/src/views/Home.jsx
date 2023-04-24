// import { useState } from "react";
import Hover3D from "../js/hover3D";

const Home = (props) => {
  let hoverEffect = new Hover3D(".hover-effect");

  const flipCard = (e) => {
    e.target.classList.toggle("is-flipped");
    console.log(e);
  };

  return (
    <div>
      <h4 className="text-center mt-2">Stack/Deck</h4>
      <div className="m-auto mt-1">
        <div className={`m-auto hover-card ${hoverEffect}`}>
          <div className="hover-card-content">
            <h1 className="deck-stack-title">Hover over me!</h1>
          </div>
        </div>
      </div>

      <h4 className="text-center mt-3">Card</h4>
      <div className="mt-1">
        <div className={`scene scene--flip-card ${hoverEffect}`}>
          <div className="flip-card" onClick={(e) => flipCard(e)}>
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

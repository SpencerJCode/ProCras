// import { useState } from "react";
import Hover3D from "../client/src/assets/js/hover3D";

const Home = (props) => {
  
  const createHoverEffect = () => {
    let hoverEffect = new Hover3D(".hover-effect");
  }

  setTimeout(createHoverEffect, 1000);

  const flipCard = (e) => {
    e.target.classList.toggle("is-flipped");
  };

  return (
    <div>
      <h4 className="text-center mt-2">Stack/Deck</h4>
      <div className="m-auto mt-1">
        <div className={`m-auto hover-deck-stack`}>
          <div className="hover-deck-stack-content">
            <h1 className="deck-stack-title">Hover over me!</h1>
          </div>
        </div>
      </div>

      <h4 className="text-center mt-3">Card</h4>
      <div className="mt-1">
        <div className={`scene scene--flip-card`}>
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

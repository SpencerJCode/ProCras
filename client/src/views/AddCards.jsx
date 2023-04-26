import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function AddCards(props) {
  const location = useLocation();
  const linkData = location.state;
  const [card, setCard] = useState({});
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [cardFrontError, setCardFrontError] = useState(null)
  const [cardBackError, setCardBackError] = useState(null)
  // console.log(linkData);

  let formIsValid = false;
  formIsValid = cardFrontError === null && cardBackError === null;

  const handleSetCard = (card) => {
    // console.log(card);
    setCard(card)
    document.getElementById("success-rate").style.display = "block"
  }

  const handleCardFront = (e) => {
    setCardFront(e.target.value)
    if (e.target.value < 1) {
      setCardFrontError("Card front must not be blank.")
    }
    else {
      setCardFrontError(null)
    }
  }

  const handleCardBack = (e) => {
    setCardBack(e.target.value)
    if (e.target.value < 1) {
      setCardBackError("Card back must not be blank.")
    }
    else {
      setCardBackError(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //if card has id, put request; if no id, create
    setCard("");
    setCardFront("");
    setCardBack("");
  }

  const clearForm = () => {
    setCard("");
    setCardFront("");
    setCardBack("");
    setCardFrontError(null);
    setCardBackError(null);
    document.getElementById("success-rate").style.display = "none"
  }

  return (
    <div className='d-flex m-auto col-8 justify-content-around add-card-bg my-shadow'>
      <div className="left-side col-4 mt-3">
        <div className="card my-shadow">
          <div className="card-header">{linkData.deck.deckName}</div>
          <div className="cards-list card-body">
            {linkData.deck.cards.map((card, i) => {
              return <p onClick={() => handleSetCard(card)}>{card.cardFront}</p>
            })}
            <button className="btn btn-primary my-shadow" onClick={clearForm} >+ Add New Card</button>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='d-flex align-items-center'>
          <div className="middle">
            <div className="card-front">
              <div className='form-group col-9 m-auto'>
                <label htmlFor="cardFront" className='mb-3'>Card Front:</label>
                <input type="text" name="cardFront" id="cardFront" className='form-control' value={cardFront} placeholder={card.cardFront} onChange={handleCardFront} />
                {cardFrontError ? (<p style={{ color: "tomato" }} className="mt-2">{cardFrontError}</p>) : ("")}
              </div>
            </div>
            <div className="card-back">
            <div className='form-group col-9 m-auto'>
                <label htmlFor="cardBack" className='mb-3'>Card Back:</label>
                <input type="text" name="cardBack" id="cardBack" className='form-control' value={cardBack} placeholder={card.cardBack} onChange={handleCardBack} />
                {cardBackError ? (<p style={{ color: "tomato" }} className="mt-2">{cardBackError}</p>) : ("")}
              </div>
            </div>
          </div>
          <div className='right-side'>
            <div className='text-light' id='success-rate'>
             {card.successes}%
            </div>
            <div className="buttons d-flex flex-column gap-4">
              <button type='submit' className={`btn btn-primary my-shadow ${formIsValid ? "" : "disabled"}`}>Save</button>
              <button className='btn btn-danger my-shadow'>Delete</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddCards;
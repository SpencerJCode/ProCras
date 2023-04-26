import React, { useState } from 'react'
import axios from 'axios';

function AddCards(props) {
  const { deck } = props;
  const [card, setCard] = useState({});
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [cardFrontError, setCardFrontError] = useState(null)
  const [cardBackError, setCardBackError] = useState(null)

  let formIsValid = false;
  formIsValid = cardFrontError === null && cardBackError === null;

  const handleSetCard = (card) => {
    setCard(card)
    setCardFront(card.cardFront)
    setCardBack(card.cardBack)
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
    if (card._id) {
      axios.put('http://localhost:8000/api/cards/' + card._id, {
        cardFront,
        cardBack
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
    else {
      console.log(deck._id);
      axios.post('http://localhost:8000/api/cards', {
        cardFront,
        cardBack,
        deck: deck._id
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
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
          <div className="card-header">{deck.deckName} - {deck.cards.length} Cards</div>
          <div className="cards-list card-body">
            {deck.cards.map((card, i) => {
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
              {  card.appearances === 0 ? "New" : Math.floor((card.successes / card.appearances)*100)+ "%"}
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
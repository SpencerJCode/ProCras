import {useLocation} from 'react-router-dom';
import React, { useState } from 'react'
import axios from 'axios';

function AddCards(props) {
  const location = useLocation();
  const deck = location.state.deck
  const [cards, setCards] = useState(deck.cards);
  const [card, setCard] = useState({});
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [cardFrontError, setCardFrontError] = useState(null)
  const [cardBackError, setCardBackError] = useState(null)

  const awaitLoadPage = () => {
    document.querySelector(".navbar-body").style.display = "block"
  }

  setTimeout(awaitLoadPage, 500)

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
        .then((res) => {
          // console.log(res)
          let updatedCards = [...cards]
          for (let i = 0; i<updatedCards.length; i++) {
            if (updatedCards[i]._id == res.data._id) {
              updatedCards[i] = res.data
            }
          }
          setCards([...updatedCards]);
          clearForm()
        })
        .catch((err) => console.log(err))
    }
    else {
      // console.log(deck._id);
      axios.post('http://localhost:8000/api/cards', {
        cardFront,
        cardBack,
        deck: deck._id
      })
        .then((res) => {
          console.log(res);
          setCards([...cards, res.data])
        })
        .catch((err) => console.log(err))
    }
    // let newThing = `<p onClick={() => handleSetCard({${card}})} id={${card._id}}>{${card.cardFront}}</p>`
    // document.querySelector(".cards-list").innerHTML = newThing + document.querySelector(".cards-list").innerHTML
  
    clearForm()
  }

  const clearForm = () => {
    setCard("");
    setCardFront("");
    setCardBack("");
    setCardFrontError(null);
    setCardBackError(null);
    document.getElementById("success-rate").style.display = "none"
  }

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete("http://localhost:8000/api/cards/" + card._id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    axios.put("http://localhost:8000/api/decks/" + deck._id , {
      cards: cards.filter((cardInDeck) => cardInDeck._id !== card._id)
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    setCards(cards.filter((cardInDeck) => cardInDeck._id !== card._id))
    clearForm()
    // document.getElementById(card._id).remove()
  }

  return (
    <div className='d-flex m-auto col-8 justify-content-around add-card-bg my-shadow'>
      <div className="left-side col-4 mt-3">
        <div className="card my-shadow cards-list-container text-light">
          <div className="card-header">{deck.deckName} {cards.length === null? <span style={{color: "lightgray"}}>- 0 Cards</span> : <span style={{color: "lightgray"}}>- {cards.length} Cards</span>}</div>
          <div className="cards-list card-body">
            {cards.map((card, i) => {
              return <p onClick={() => handleSetCard(card)} id={card._id}>{card.cardFront}</p>
            })}
            <button className="btn btn-create text-light my-shadow" onClick={clearForm} >+ Add New Card</button>
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
              <button type='submit' className={`btn btn-create text-light my-shadow ${formIsValid ? "" : "disabled"}`}>Save</button>
              <button className='btn btn-delete text-light my-shadow' onClick = {(e) => handleDelete(e)}>Delete</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddCards;
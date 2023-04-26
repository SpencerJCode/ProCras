import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function AddCards(props) {
  const location = useLocation();
  const linkData = location.state;
  const [card, setCard] = useState({});
  // console.log(linkData);

  const handleSetCard = (card) => {
    console.log(card);
    setCard(card)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const clearForm = () => {
    setCard("");
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
            <button className="btn btn-primary my-shadow" onClick={clearForm} >Add Button</button>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='d-flex align-items-center'>
          <div className="middle">
            <div className="card-front">
              <div className='form-group col-9 m-auto'>
                <label htmlFor="cardFront" className='mb-3'>Card Front:</label>
                <input type="text" name="cardFront" id="cardFront" className='form-control' placeholder={card.cardFront} />
              </div>
            </div>
            <div className="card-back">
            <div className='form-group col-9 m-auto'>
                <label htmlFor="cardBack" className='mb-3'>Card Back:</label>
                <input type="text" name="cardBack" id="cardBack" className='form-control' placeholder={card.cardBack} />
              </div>
            </div>
          </div>
          <div className='right-side'>
            <div className='success-rate'>
              <p>{card.successes}</p>
            </div>
            <div className="buttons d-flex flex-column gap-4">
              <button type='submit' className='btn btn-primary shadow-sm'>Save</button>
              <button className='btn btn-danger shadow-sm'>Delete</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddCards;
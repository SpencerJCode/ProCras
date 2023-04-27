import React, { useState, useEffect } from "react"
import axios from "axios"
import Decks from "../components/decks"
import Stacks from "../components/stacks"
import AddStackModal from "../components/AddStackModal"
import EditStackModal from "../components/EditStackModal"
import DeleteWarningStackModal from "../components/DeleteWarningStackModal"
import EditDeckModal from "../components/EditDeckModal"
import DeleteWarningDeckModal from "../components/DeleteWarningDeckModal"
import AddDeckModal from "../components/AddDeckModal"

const Study = (props) => {
  const [stacks, setStacks] = useState([]);
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [selectedDecks, setSelectedDecks] = useState([]);
  const [sessionDecks, setSessionDecks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/stacks')
      .then(res => {
        setStacks(res.data);
      })
      .catch(err => console.error(err));

    axios.get('http://localhost:8000/api/decks')
      .then(res => {
        setDecks(res.data);
        setSessionDecks(res.data.filter((deck) => deck.studySession !== false));
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:8000/api/cards')
      .then(res => {
        setCards(res.data);
      })
      .catch(err => console.log(err))
  }, []);

  const handleStackSelect = (stack) => {
    // console.log(stack);
    setSelectedStacks([...selectedStacks, stack]);
    if (stack.decks.length !== 0) {
      for (let i = 0; i < stack.decks.length; i++) {
        console.log(stack.decks[i]);
        console.log(document.getElementById(`${stack.decks[i]}`));
        document.getElementById(`${stack.decks[i]}`).style.display = "none"
      }
    }
    document.getElementById(`${stack._id}`).style.display = "none"
  }

  const handleDeckSelect = (deck) => {
    setSelectedDecks([...selectedDecks, deck]);
  }

  const removeFromList = (e, item) => {
    e.preventDefault();
    // console.log(item);
    if ('stackName' in item) {
      setSelectedStacks(selectedStacks.filter((stack) => stack._id !== item._id));
      document.getElementById(`${item._id}`).style.display = "block";
      for (let i = 0; i < item.decks.length; i++) {
        document.getElementById(`${item.decks[i]}`).style.display = "block"
      }
    }
    else {
      setSelectedDecks(selectedDecks.filter((deck) => deck._id !== item._id));
      document.getElementById(`${item._id}`).style.display = "block";
    }
  }

  const handleSubmit = (e) => {

  }

  //if a stack is selected, remove all decks in that stack from the deck map on left side, document.getsjjsjd
  //if stack is removed from session form, add the decks back to left side deck map

  return (
    <div>
      <div className="d-flex col-10 justify-content-around m-auto mt-3">
        <div className="left-side col-4">
          <div class="accordion my-shadow" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="stacksHeading">
                <button class="accordion-button stacks-header text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Stacks
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="stacksHeading" data-bs-parent="#accordionExample">
                <div class="accordion-body text-light" id="stacksBody">
                  {stacks.map((stack, i) => {
                    return <p onClick={() => handleStackSelect(stack)} id={stack._id} >{stack.stackName}</p>
                  })}
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="decksHeading">
                <button class="accordion-button collapsed decks-header text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Decks
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="decksHeading" data-bs-parent="#accordionExample">
                <div class="accordion-body text-light" id="decksBody">
                  {decks.map((deck, i) => {
                    return <p onClick={() => handleDeckSelect(deck)} id={deck._id} >{deck.deckName}</p>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-side col-6">
          <form onSubmit={handleSubmit}>
            <div className="card my-shadow selection-list">
              <div className="card-header">
                <div className="form-floating">
                  <input type="text" id="stackName" name="stackName" className="form-control" placeholder="Session Name:" />
                  <label htmlFor="stackName">Session Name:</label>
                </div>
              </div>
              <div className="card-body text-light">
                <h6 className="text-center">Repeated cards will not be included in study session.</h6>
                <div>
                  {selectedStacks.map((stack, i) => {
                    return (
                      <div className="d-flex align-items-center justify-content-between m-2">
                        <p>{stack.stackName}</p>
                        <button className="btn my-shadow btn-delete text-light" onClick={(e) => removeFromList(e, stack)}>Remove Stack</button>
                      </div>
                    )
                  })}
                  {selectedDecks.map((deck, i) => {
                    return (
                      <div className="d-flex align-items-center justify-content-between m-2">
                        <p>{deck.deckName}</p>
                        <button className="btn my-shadow btn-delete text-light" onClick={(e) => removeFromList(e, deck)}>Remove Deck</button>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <button className="btn my-shadow btn-create text-light">STUDY!</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="bottom col-10 m-auto mt-3">
        <div className="card previous-list-container text-light">
          <div className="card-header">Previous Sessions</div>
          <div className="card-body">
            {sessionDecks.map((deck, i) => {
              let appearancesSum = 0;
              for (i = 0; i < deck.cards.length; i++) {
                appearancesSum += parseInt(deck.cards[i].appearances)
              }
              let successesSum = 0;
              for (i = 0; i < deck.cards.length; i++) {
                successesSum += parseInt(deck.cards[i].successes)
              }
              let successRate = Math.floor((successesSum / appearancesSum) * 100)
              return <div className="d-flex align-items-center justify-content-between m-2">
                <p>{deck.deckName}</p>
                <p>{successRate}</p>
                <button className="btn my-shadow btn-delete text-light" onClick={(e) => removeFromList(e, deck)}>Remove Session</button>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
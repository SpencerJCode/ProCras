import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Study = (props) => {
  const [stacks, setStacks] = useState([]);
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [selectedDecks, setSelectedDecks] = useState([]);
  const [sessionDecks, setSessionDecks] = useState([]);
  const [deckName, setDeckName] = useState("");
  const [deckNameError, setDeckNameError] = useState(false);
  const [studyDeck, setStudyDeck] = useState({})
  const navigate = useNavigate()

  let formIsValid = false;
  formIsValid = deckNameError === null;

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
        // console.log(stack.decks[i]);
        // console.log(document.getElementById(`${stack.decks[i]}`));
        document.getElementById(`${stack.decks[i]}`).style.display = "none"
      }
    }
    document.getElementById(`${stack._id}`).style.display = "none"
  }

  const handleDeckSelect = (deck) => {
    setSelectedDecks([...selectedDecks, deck]);
    document.getElementById(`${deck._id}`).style.display = "none"

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

  const handleDeckName = (e) => {
    setDeckName(e.target.value) 
    if (e.target.value < 1) {
        setDeckNameError("Session name must not be blank.")
    }
    else {
      setDeckNameError(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (deckNameError === false) {
      setDeckNameError("Session name must not be blank.")
    }
    let allSelectedDecks = [...selectedDecks]
    for (let i=0; i<selectedStacks.length; i++){
      for (let j=0; j<selectedStacks[i].decks.length; j++){
        let foundDeckId = selectedStacks[i].decks[j]
        let foundDeck = {}
        for (let k=0; k<decks.length; k++){
          if (decks[k]._id == foundDeckId){
            foundDeck = decks[k]
          }
        }
        let inDecks = false
        for (let k=0; k<allSelectedDecks.length; k++){
          if (allSelectedDecks[k]._id == foundDeck._id){inDecks = true}
        }
        if (inDecks == false){allSelectedDecks = [...allSelectedDecks, foundDeck]}
      }
    }
    let allSelectedCards = []
    for (let i=0; i<allSelectedDecks.length; i++) {
      for (let j=0; j<allSelectedDecks[i].cards.length; j++) {
        allSelectedCards.push(allSelectedDecks[i].cards[j])
      }
    }
    for (let i=0; i<allSelectedCards.length; i++){
      for (let j=0; j<cards.length; j++){
        if (cards[j]._id == allSelectedCards[i]){
          allSelectedCards[i]=cards[j]
        }
      }
    }
    // console.log(allSelectedCards)
    axios
      .post("http://localhost:8000/api/decks", {
        deckName,
        cards: [...allSelectedCards],
        studySession: true
      })
      .then(res => {
        setStudyDeck(res.data);
      })
      .catch(err => console.error(err));
    navigate('/flashzone', {state:{studyDeck: allSelectedCards, deckName: deckName}})
  }

  return (
    <div>
      <div className="d-flex col-10 justify-content-around m-auto mt-3">
        <div className="left-side col-4">
          <div className="accordion my-shadow" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="stacksHeading">
                <button className="accordion-button stacks-header text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <h2>Stacks</h2>
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="stacksHeading" data-bs-parent="#accordionExample">
                <div className="accordion-body text-light" id="stacksBody">
                  {stacks.map((stack, i) => {
                    return <p onClick={() => handleStackSelect(stack)} id={stack._id} >{stack.stackName}</p>
                  })}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="decksHeading">
                <button className="accordion-button collapsed decks-header text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <h2>Decks</h2>
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="decksHeading" data-bs-parent="#accordionExample">
                <div className="accordion-body text-light" id="decksBody">
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
                  <input type="text" id="deckName" name="deckName" className="form-control" placeholder="Session Name:" onChange = {handleDeckName} />
                  <label htmlFor="deckName">Please name your session:</label>
                  {deckNameError ? (<p style={{ color: "tomato" }} className="mt-2">{deckNameError}</p>) : ("")}

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
                <div className="study-button">
                  <button type="submit" 
                  className={`btn my-shadow btn-create text-light ${formIsValid ? "" : "disabled"}`}
                >STUDY!</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="bottom col-10 m-auto mt-3">
        <div className="card previous-list-container text-light my-shadow">
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
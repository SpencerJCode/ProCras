import React, {useState, useEffect } from "react"
import axios from "axios"
import Decks from "../components/decks"
import Stacks from "../components/stacks"
import { Link } from "react-router-dom"
import AddStackModal from "../components/AddStackModal"
import EditStackModal from "../components/EditStackModal"
import DeleteWarningModal from "../components/DeleteWarningModal"
import EditDeckModal from "../components/EditDeckModal"
import DeleteWarningDeckModal from "../components/DeleteWarningDeckModal"


const MyCards = (props) => {
  const [stacks, setStacks] = useState([]);
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [stacksLoaded, setStacksLoaded ] = useState(false);
  const [decksLoaded, setDecksLoaded ] = useState(false);
  const [cardsLoaded, setCardsLoaded] = useState(false);
  const [showAddStack, setShowAddStack] = useState(false);
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [showEditStack, setShowEditStack] = useState(false);
  const [showEditDeck, setShowEditDeck] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showDeleteDeckWarning, setShowDeleteDeckWarning] = useState(false);
  const [stackId, setStackId] = useState("");
  const [deckId, setDeckId] = useState('');

  useEffect(()=>{
    if (stacksLoaded === false) {
      axios.get('http://localhost:8000/api/stacks')
        .then(res=>{
            setStacks(res.data);
            setStacksLoaded(true)
        })
        .catch(err => console.error(err));
    
    axios.get('http://localhost:8000/api/decks')
        .then(res => {
          setDecks(res.data);
        })
        .catch(err => console.log(err));

    axios.get('http://localhost:8000/api/cards')
        .then(res => {
          setCards(res.data);
          setCardsLoaded(true)
        })
        .catch(err => console.log(err))
    }
    
},[cardsLoaded, stacksLoaded]);
  
  const highlightedStack = (id) => {
    setFilteredDecks(decks.filter((deck) => deck.stack === id))
    setDecksLoaded(true)
  }

  const handleOpenStackModal = () =>{
    setShowAddStack(true);
  }

  const handleOpenDeckModal = () =>{
    setShowAddDeck(true);
  }

    return (
      <div>
        <EditStackModal showEditStack={showEditStack} setShowEditStack={setShowEditStack} setStacksLoaded={setStacksLoaded} stackId={stackId} />
        <AddStackModal showAddStack={showAddStack} setShowAddStack={setShowAddStack} setStacksLoaded={setStacksLoaded} />
        <DeleteWarningModal stackId={stackId} showDeleteWarning={showDeleteWarning} setShowDeleteWarning={setShowDeleteWarning} setStacksLoaded={setStacksLoaded}/>
        <EditDeckModal showEditDeck={showEditDeck} setShowEditDeck={setShowEditDeck} setStacksLoaded={setStacksLoaded} deckId={deckId}/>
        <DeleteWarningDeckModal deckId={deckId} showDeleteDeckWarning={showDeleteDeckWarning} setShowDeleteDeckWarning={setShowDeleteDeckWarning} setStacksLoaded={setStacksLoaded}/>
        <Link>
          <button className="btn btn-primary mt-3" onClick={handleOpenStackModal}>Add stack</button>
        </Link>
         <div className = "stackContainer col-10">
            {stacksLoaded && <Stacks stacks = {stacks} highlightedStack = {highlightedStack} setStacksLoaded={setStacksLoaded} setShowEditStack={setShowEditStack} setStackId={setStackId} setShowDeleteWarning={setShowDeleteWarning}/>}
          </div>
          <button className="btn btn-primary mt-3" onClick={handleOpenDeckModal}>Add Deck to Stack</button>
          <div className = "deckContainer">
            {decksLoaded && <Decks filteredDecks={filteredDecks} setFilteredDecks={setFilteredDecks} cards = {cards} decksLoaded={decksLoaded} setDecksLoaded={setDecksLoaded} />}
          </div>
      </div>
    );
  };
  
  export default MyCards;
  
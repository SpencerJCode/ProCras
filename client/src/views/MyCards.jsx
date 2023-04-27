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


const MyCards = (props) => {
  const {deck, setDeck} = props;
  const [stacks, setStacks] = useState([]);
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [stacksLoaded, setStacksLoaded] = useState(false);
  const [decksLoaded, setDecksLoaded] = useState(false);
  const [cardsLoaded, setCardsLoaded] = useState(false);
  const [showAddStack, setShowAddStack] = useState(false);
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [showEditStack, setShowEditStack] = useState(false);
  const [showEditDeck, setShowEditDeck] = useState(false);
  const [showDeleteStackWarning, setShowDeleteStackWarning] = useState(false);
  const [showDeleteDeckWarning, setShowDeleteDeckWarning] = useState(false);
  const [stackId, setStackId] = useState("");
  const [deckId, setDeckId] = useState('');
  const [filteredDecksLoaded, setFilteredDecksLoaded ] = useState(false)

  useEffect(() => {
    if (stacksLoaded === false || decksLoaded === false) {
      axios.get('http://localhost:8000/api/stacks')
        .then(res => {
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


  }, [cardsLoaded, stacksLoaded, decksLoaded, filteredDecksLoaded]);

  const highlightedStack = (id) => {
    setFilteredDecks(decks.filter((deck) => deck.stack === id))
    setDecksLoaded(true)
    setStackId(id);
  }

  const handleOpenStackModal = () => {
    setShowAddStack(true);
  }

  const handleOpenDeckModal = () => {
    setShowAddDeck(true);
  }

  return (
    <div>
      <EditStackModal showEditStack={showEditStack} setShowEditStack={setShowEditStack} setStacksLoaded={setStacksLoaded} stackId={stackId} />
      <AddStackModal showAddStack={showAddStack} setShowAddStack={setShowAddStack} setStacksLoaded={setStacksLoaded} />
      <DeleteWarningStackModal stackId={stackId} showDeleteStackWarning={showDeleteStackWarning} setShowDeleteStackWarning={setShowDeleteStackWarning} setStacksLoaded={setStacksLoaded} />
      <EditDeckModal showEditDeck={showEditDeck} setShowEditDeck={setShowEditDeck} setStacksLoaded={setStacksLoaded} deckId={deckId} setDecksLoaded={setDecksLoaded} filteredDecksLoaded={filteredDecksLoaded} setFilteredDecksLoaded={setFilteredDecksLoaded} stackId={stackId} highlightedStack={highlightedStack} filteredDecks={filteredDecks} setFilteredDecks={setFilteredDecks}/>
      <AddDeckModal showAddDeck={showAddDeck} setShowAddDeck={setShowAddDeck} setStacksLoaded={setStacksLoaded} stackId={stackId} setFilteredDecks={setFilteredDecks} filteredDecks={filteredDecks} setDeck={setDeck} />
      <DeleteWarningDeckModal deckId={deckId} showDeleteDeckWarning={showDeleteDeckWarning} setShowDeleteDeckWarning={setShowDeleteDeckWarning} setDecksLoaded={setDecksLoaded} />
      <div className="stackContainer col-9">
        <button className="btn my-shadow btn-create text-light" onClick={handleOpenStackModal}><span>+</span> Create stack</button>
        <div className="horizontal-line" ></div>
        {stacksLoaded && <Stacks stacks={stacks} highlightedStack={highlightedStack} stacksLoaded={stacksLoaded} setStacksLoaded={setStacksLoaded} setShowEditStack={setShowEditStack} setStackId={setStackId} setShowDeleteStackWarning={setShowDeleteStackWarning} />}
      </div>
      <div className="deckContainer col-9">
        <button className="btn my-shadow btn-create text-light" onClick={handleOpenDeckModal}><span>+</span> Add Deck to Stack</button>
        <div className="horizontal-line" ></div>
        {decksLoaded && <Decks filteredDecks={filteredDecks} setFilteredDecks={setFilteredDecks} cards={cards} decksLoaded={decksLoaded} setDecksLoaded={setDecksLoaded} setShowEditDeck={setShowEditDeck} setDeckId={setDeckId} stackId={stackId} setStackId={setStackId} filteredDecksLoaded={filteredDecksLoaded} setFilteredDecksLoaded={setFilteredDecksLoaded} setShowDeleteDeckWarning={setShowDeleteDeckWarning} setDeck={setDeck}/>}
      </div>
    </div>
  );
};

export default MyCards;

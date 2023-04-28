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
import sound2 from "../assets/sounds/save-button2.mp3"
import sound1 from "../assets/sounds/study-loading.mp3"
import sound3 from "../assets/sounds/click-on-deck.mp3"


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
  const [stackSelected, setStackSelected] = useState(false);
  const [stackName, setStackName] = useState();
  const clickSound = new Audio(sound2)
  const studyLoading = new Audio(sound1)
  const clickDeckStack = new Audio(sound3)

  useEffect(() => {
  document.querySelector(".navbar-body").style.display = "block"
    
    if (stacksLoaded === false || decksLoaded === false) {
      // studyLoading.play()
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

  const highlightedStack = (id, stackName) => {
    clickDeckStack.play()
    document.getElementById("add-to-stack").classList.remove("disabled")
    setFilteredDecks(decks.filter((deck) => deck.stack === id))
    setDecksLoaded(true)
    setStackId(id);
    setStackName(stackName)
    // if (document.getElementById(stackId) !== null) {
      
    // }
    // document.getElementById(id).style.opacity = "0.5"
  }

  const handleOpenStackModal = () => {
    clickSound.play()
    setShowAddStack(true);
  }

  const handleOpenDeckModal = () => {
    clickSound.play()
    setShowAddDeck(true);
  }

  return (
    <div>
      <EditStackModal showEditStack={showEditStack} setShowEditStack={setShowEditStack} setStacksLoaded={setStacksLoaded} stackId={stackId} />
      <AddStackModal showAddStack={showAddStack} setShowAddStack={setShowAddStack} setStacksLoaded={setStacksLoaded} />
      <DeleteWarningStackModal stackId={stackId} showDeleteStackWarning={showDeleteStackWarning} setShowDeleteStackWarning={setShowDeleteStackWarning} setStacksLoaded={setStacksLoaded} />
      <EditDeckModal showEditDeck={showEditDeck} setShowEditDeck={setShowEditDeck} setStacksLoaded={setStacksLoaded} deckId={deckId} setDecksLoaded={setDecksLoaded} filteredDecksLoaded={filteredDecksLoaded} setFilteredDecksLoaded={setFilteredDecksLoaded} stackId={stackId} highlightedStack={highlightedStack} filteredDecks={filteredDecks} setFilteredDecks={setFilteredDecks} stackName={stackName}/>
      <AddDeckModal showAddDeck={showAddDeck} setShowAddDeck={setShowAddDeck} setStacksLoaded={setStacksLoaded} stackId={stackId} setFilteredDecks={setFilteredDecks} filteredDecks={filteredDecks} setDeck={setDeck} deck={deck} stackName={stackName} />
      <DeleteWarningDeckModal deckId={deckId} showDeleteDeckWarning={showDeleteDeckWarning} setShowDeleteDeckWarning={setShowDeleteDeckWarning} setDecksLoaded={setDecksLoaded} />
      <div className="stackContainer col-9">
        <button className="btn my-shadow btn-create text-light" onClick={handleOpenStackModal}><span>+</span> Create stack</button>
        <div className="horizontal-line" ></div>
        {stacksLoaded && <Stacks stacks={stacks} highlightedStack={highlightedStack} stacksLoaded={stacksLoaded} setStacksLoaded={setStacksLoaded} setShowEditStack={setShowEditStack} setStackId={setStackId} setShowDeleteStackWarning={setShowDeleteStackWarning} stackId={stackId} />}
      </div>
      <div className="deckContainer col-9">
        <button className="btn my-shadow btn-create text-light disabled" onClick={handleOpenDeckModal} id="add-to-stack"><span>+</span> Add Deck to Stack</button>
        <div className="horizontal-line" ></div>
        {decksLoaded && <Decks filteredDecks={filteredDecks} setFilteredDecks={setFilteredDecks} cards={cards} decksLoaded={decksLoaded} setDecksLoaded={setDecksLoaded} setShowEditDeck={setShowEditDeck} setDeckId={setDeckId} stackId={stackId} setStackId={setStackId} filteredDecksLoaded={filteredDecksLoaded} setFilteredDecksLoaded={setFilteredDecksLoaded} setShowDeleteDeckWarning={setShowDeleteDeckWarning} setDeck={setDeck}/>}
      </div>
    </div>
  );
};

export default MyCards;

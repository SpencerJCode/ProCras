import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const EditDeckModal = ({ showEditDeck, setShowEditDeck, setStacksLoaded, deckId, setDecksLoaded, stackId, highlightedStack, filteredDecksLoaded, setFilteredDecksLoaded, filteredDecks, setFilteredDecks, stackName}) => {
  const [deckName, setDeckName] = useState("");

  const handleClose = () => {
    setShowEditDeck(false);
  };

  const handleDeckName = (e) => {
    setDeckName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/api/decks/" + deckId, {
        deckName,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      setFilteredDecksLoaded(false)
      let updatedDecks = [...filteredDecks]
      for (let i=0; i<updatedDecks.length; i++){
        if (updatedDecks[i]._id == deckId){
          updatedDecks[i].deckName = deckName
        }
      }
      setFilteredDecks([...updatedDecks])
      highlightedStack(stackId) //we confirmed that stackId is correct
  };

  return (
    <Modal show={showEditDeck} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Deck for {stackName} Stack</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="text"
              placeholder="Name:"
              className="form-control"
              id="deckName"
              name="deckName"
              onChange={handleDeckName}
            />
            <label htmlFor="deckName">Name:</label>
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              Edit Deck
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditDeckModal;

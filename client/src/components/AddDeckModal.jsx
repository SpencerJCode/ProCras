import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const AddDeckModal = ({ showAddDeck, setShowAddDeck, setStacksLoaded, stackId, setFilteredDecks, filteredDecks, setDeck }) => {
  const [deckName, setDeckName] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setShowAddDeck(false);
  };

  const handleDeckName = (e) => {
    setDeckName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/decks", {
        deckName,
        stack: stackId
      })
      .then((res) => {
        console.log(res)
        setDeck(res.data);
        // let updatedDecks = [...filteredDecks, res.data]
        // setFilteredDecks([...updatedDecks])
        navigate('/addcards')
      })
      .catch((err) => console.log(err));
    setStacksLoaded(false)
  };

  return (
    <Modal show={showAddDeck} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Deck</Modal.Title>
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
              Create Deck
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDeckModal;

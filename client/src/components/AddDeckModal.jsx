import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const AddDeckModal = ({ showAddDeck, setShowAddDeck, setStacksLoaded, stackId, setFilteredDecks, filteredDecks, setDeck, deck, stackName }) => {
  const [deckName, setDeckName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false)

  let formIsValid = false;
  formIsValid = error === null;

  const handleClose = () => {
    setShowAddDeck(false);
    setError(null)
  };

  const handleDeckName = (e) => {
    setDeckName(e.target.value);
    if (e.target.value < 1) {
      setError("Deck name cannot be blank.")
    }
    else {
      setError(null)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let createdDeck;
    let decksInStack;
    axios
      .post("http://localhost:8000/api/decks", {
        deckName,
        stack: stackId
      })
      .then((res) => {
        setDeck(res.data);
        createdDeck = res.data
        // console.log("This is the createdDeck data: ", createdDeck);
        return axios.get("http://localhost:8000/api/stacks/" + stackId)
          .then((res) => {
            // console.log("This is the decks array: " , res.data.decks);
            decksInStack = res.data.decks
            // console.log("Deck: ", createdDeck);
            return axios.put("http://localhost:8000/api/stacks/" + stackId, {
              decks: [...decksInStack, createdDeck]
            })
              .then((res) => {
                console.log("Deck in put request: " , res.data);
                navigate('/addcards', {state:{deck: createdDeck}})
              })
              .catch((err) => console.log("put error: ", err))
          })
          .catch((err) => console.log("get error :", err))
      })
      .catch((err) => console.log(err));

    setStacksLoaded(false)
  };

  return (
    <Modal show={showAddDeck} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Deck for {stackName} Stack</Modal.Title>
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
            {error ? (<p style={{ color: "tomato" }} className="mt-2">{error}</p>) : ("")}
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" onClick={handleClose} className={`btn btn-create text-light my-shadow ${formIsValid ? "" : "disabled"}`} >
              Create Deck
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDeckModal;

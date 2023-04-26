import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const DeleteWarningDeckModal = ({ showDeleteWarning, setShowDeleteWarning, setStacksLoaded, stackId }) => {

  const handleClose = () => {
    setShowDeleteWarning(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.delete('http://localhost:8000/api/stacks/' + stackId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    setStacksLoaded(false)
  };

  return (
    <Modal show={showDeleteWarning} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body><h3 className="text-danger">
        This will delete all associated decks and cards. Continue?</h3>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <form onSubmit={handleSubmit}>
            <Button type="submit" variant="primary" onClick={handleClose}>
              I understand. Delete!
            </Button>
            </form>
          </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteWarningDeckModal;

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const EditStackModal = ({ showEditStack, setShowEditStack, setStacksLoaded, stackId }) => {
  const [stackName, setStackName] = useState("");

  const handleClose = () => {
    setShowEditStack(false);
  };

  const handleStackName = (e) => {
    setStackName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/api/stacks/" + stackId, {
        stackName,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setStacksLoaded(false)
  };

  return (
    <Modal show={showEditStack} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Stack</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="text"
              placeholder="Name:"
              className="form-control"
              id="stackName"
              name="stackName"
              onChange={handleStackName}
            />
            <label htmlFor="stackName">Name:</label>
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              Edit Stack
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStackModal;

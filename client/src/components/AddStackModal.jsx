import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const AddStackModal = ({ showAddStack, setShowAddStack, setStacksLoaded }) => {
  const [stackName, setStackName] = useState("");

  const handleClose = () => {
    setShowAddStack(false);
  };

  const handleStackName = (e) => {
    setStackName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/stacks", {
        stackName,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setStacksLoaded(false)
  };

  return (
    <Modal show={showAddStack} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Stack</Modal.Title>
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
              Create Stack
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddStackModal;

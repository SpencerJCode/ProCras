import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const EditStackModal = ({ showEditStack, setShowEditStack, setStacksLoaded, stackId }) => {
  const [stackName, setStackName] = useState("");
  const [error, setError] = useState(false)

  let formIsValid = false;
  formIsValid = error === null;

  const handleClose = () => {
    setShowEditStack(false);
    setError(null)
  };

  const handleStackName = (e) => {
    setStackName(e.target.value);
    if (e.target.value < 1) {
      setError("Stack name cannot be blank.")
    }
    else {
      setError(null)
    }
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
              placeholder="Stack Name:"
              className="form-control"
              id="stackName"
              name="stackName"
              onChange={handleStackName}
            />
            <label htmlFor="stackName">Stack Name:</label>
            {error ? (<p style={{ color: "tomato" }} className="mt-2">{error}</p>) : ("")}
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" onClick={handleClose} className={`btn btn-create text-light my-shadow ${formIsValid ? "" : "disabled"}`}>
              Edit Stack
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStackModal;

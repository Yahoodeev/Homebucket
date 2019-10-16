import React, { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useMutation, useLazyQuery } from "@apollo/client";
import { ADDROOM } from "../ApolloClient/mutations";
import { useUser } from "../context/userContext";

export default function CreateRoomModal() {
  const { setUser } = useUser();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addRoom, { loading, data, error }] = useMutation(ADDROOM);

  useEffect(() => {
    if (!!data?.addRoom) {
      setUser((user) => ({
        ...user,
        rooms: [...(user?.rooms ?? []), data.addRoom]
      }));
    }
  }, [data]);

  const initialFormState = {
    roomName: "",
    description: ""
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = ({ target: { name, value } }) =>
    setFormState((state) => ({ ...state, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addRoom({ variables: formState });
    if (!error) {
      setFormState(initialFormState);
      handleClose();
    }
  };

  return (
    <>
      <Button className="mb-2" variant="outline-dark" onClick={handleShow}>
        Create room
      </Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!error && <p>{error.message}</p>}
          <form>
            <Row>
              <Col md={12} className="mt-4">
                <Form.Group className="mb-3 text-left" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="roomName"
                    onChange={handleChange}
                    value={formState.roomName}
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-4">
                <Form.Group className="mb-3 text-left" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <textarea
                    rows="4"
                    className="form-control"
                    onChange={handleChange}
                    value={formState.description}
                    name="description"
                  />
                </Form.Group>
              </Col>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save room
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

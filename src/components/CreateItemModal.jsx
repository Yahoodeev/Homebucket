import React, { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import uniqBy from "lodash/uniqBy";
import { useMutation, useLazyQuery } from "@apollo/client";
import { ADDITEM } from "../ApolloClient/mutations";
import { CATEGORIES } from "../ApolloClient/query";
import { useUser } from "../context/userContext";

export default function CreateItemModal({ roomId }) {
  const { setUser } = useUser();
  const [show, setShow] = useState(false);
  const [imagePicked, setImagePicked] = useState();
  const [filePath, setFilePath] = useState("");

  const fileTypes = ["JPG", "PNG", "GIF"];

  const initialFormState = {
    description: "",
    price: "",
    quantity: "",
    category: ""
  };

  const [formState, setFormState] = useState(initialFormState);
  const [addItem, { loading, data, error }] = useMutation(ADDITEM);
  const [
    categories,
    { loading: categoryLoading, data: categoryData, error: categoryError }
  ] = useLazyQuery(CATEGORIES);

  const handleChange = ({ target: { name, value } }) =>
    setFormState((state) => ({ ...state, [name]: value }));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleImagePicked = (image) => {
    setImagePicked(image);
    const data = new FormData();
    data.append("file", image);
    axios
      .post("http://localhost:4000/upload", data)
      .then((res) => {
        setFilePath(res.data.path);
      })
      .catch(console.log);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem({
      variables: { ...formState, room: roomId, image: filePath }
    });
    if (!error) {
      setFormState(initialFormState);
      setImagePicked(null);
      setFilePath(null);
      handleClose();
    }
  };

  useEffect(() => {
    if (data?.addItem) {
      setUser((user) => ({
        ...user,
        rooms: user.rooms.map((room) => {
          if (room.id === roomId)
            return { ...room, items: [...(room?.items ?? []), data.addItem] };
          return room;
        })
      }));
    }
  }, [data]);

  useEffect(() => {
    categories();
  }, []);

  return (
    <>
      <Col className="px-4 text-light" sm={3}>
        <div
          className="d-flex justify-content-center align-items-center rounded"
          style={{
            height: "170px",
            backgroundColor: "gray",
            cursor: "pointer"
          }}
          onClick={handleShow}
        >
          + Add new item
        </div>
      </Col>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Row>
              <Col as="h6">Drag and drop image here...</Col>
              <Col md={12} className="d-flex justify-content-between gap">
                <Col md={12} className="me-2">
                  <FileUploader
                    name="file"
                    types={fileTypes}
                    handleChange={handleImagePicked}
                  />
                </Col>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mt-4">
                <Form.Group className="mb-3 text-left" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <textarea
                    rows="4"
                    className="form-control"
                    name="description"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-4">
                <Form.Group className="mb-3 text-left" controlId="description">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="category"
                    onChange={handleChange}
                    value={formState.category}
                  >
                    <option value="">select one categorys</option>
                    {categoryData?.categories?.map((item) => (
                      <option value={item.id} key={item.type}>
                        {item.type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mt-4">
                <Form.Group className="mb-3 text-left" controlId="name">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="Enter Price"
                    onChange={handleChange}
                    value={formState.price}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mt-4">
                <Form.Group className="mb-3 text-left" controlId="description">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity"
                    onChange={handleChange}
                    value={formState.quantity}
                  />
                </Form.Group>
              </Col>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Add item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../ApolloClient/mutations"

export default function Register() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
   const [register, { loading, data, error }] = useMutation(REGISTER);

  useEffect(()=>{
    if(!loading && !!data?.register){
      setUser(data?.register?.user);
    }
  },[data])

  useEffect(()=>{
    if(!!user){
      localStorage.setItem("homebucket", data?.register?.token);
      navigate("/user");
    }
  },[user])

  const initialFormState = {
    email: "",
    password: "",
    username: "",
  };

  const [formState, setFromState] = useState(initialFormState);

  const handleRegister = async (e) => {
    e.preventDefault();
    await register({ variables: formState})
  };

  const handleChange = ({ target: { name, value } }) =>
    setFromState((state) => ({ ...state, [name]: value }));

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <form onSubmit={handleRegister} className="border p-4 rounded bg-light">
        <h1 className="mb-4 text-center">Register</h1>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3 text-left" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
                value={formState.username}
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-3 text-left" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={formState.email}
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-3 text-left" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                value={formState.password}
              />
            </Form.Group>
          </Col>
        </Row>
        {!!error && <p className="text-danger mb-4">{error.message}</p>}
        <Row className="mt-4">
          <Col>
            <Button
              className="me-4 w-100"
              variant="dark"
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          </Col>
          <Col>
            <Button type="submit" className="w-100">
              Register
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

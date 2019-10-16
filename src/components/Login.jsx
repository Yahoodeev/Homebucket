import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../ApolloClient/mutations"

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const initialFormState = {
    email: "",
    password: "",
  };

  const [formState, setFromState] = useState(initialFormState);
  const [login, { loading, data, error }] = useMutation(LOGIN);

  useEffect(()=>{
    if(!loading && !!data?.login){
      setUser(data?.login?.user);
    }
  },[data])

  useEffect(()=>{
    if(!!user){
      localStorage.setItem("homebucket", data?.login?.token);
      navigate("/user");
    }
  },[user])

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({variables: {email: formState.email, password: formState.password}})
  };

  const handleChange = ({ target: { type, value } }) =>
    setFromState((state) => ({ ...state, [type]: value }));

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <form onSubmit={handleLogin} className="border p-4 rounded bg-light">
        <h1 className="mb-4 text-center">Login</h1>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3 text-left" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
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
              Login
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

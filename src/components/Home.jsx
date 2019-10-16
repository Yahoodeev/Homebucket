import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useUser();
  useEffect(() => {
    if (!!user) navigate("/user");
  }, [user]);
  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <h1>
        Welcome to <span className="text-primary">Home bucket</span>
      </h1>
      <div>
        <Button className="me-4" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button variant="warning" onClick={() => navigate("/register")}>
          Register
        </Button>
      </div>
    </Container>
  );
}

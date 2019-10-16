import React, { useEffect, useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import UserDashboard from "./UserDashboard";
import Profile from "./Profile";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [activeTab, setActiveTab] = useState(
    window.location.pathname.split("/")[2] ?? "dashboard"
  );


  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  const handleTabChange = (tab) => setActiveTab(tab);
  const logout = () => {
    localStorage.removeItem("homebucket");
    setUser(null);
  };

  return (
    <Row style={{ minHeight: "100vh", maxWidth: "100vw" }}>
      <Col
        sm={3}
        className="pt-5 p-4 border-right"
        style={{ borderRight: "1px solid grey" }}
      >
        <Row>
          <Col md={12}>
            <h3>Menu</h3>
          </Col>
          <Col md={12}>
            <Button
              className={`w-100 mb-2 mt-5 ${
                activeTab === "dashboard" && "btn-primary"
              }`}
              variant={activeTab === "dashboard" ? "primary" : "outline-dark"}
              onClick={() => handleTabChange("dashboard")}
            >
              Dashboard
            </Button>
          </Col>
          <Col md={12}>
            <Button
              className="w-100 mb-2"
              variant={activeTab === "profile" ? "primary" : "outline-dark"}
              onClick={() => handleTabChange("profile")}
            >
              Profile
            </Button>
          </Col>
          <Col md={12}>
            <Button
              className="w-100 mt-5"
              variant={"outline-danger"}
              onClick={logout}
            >
              Logout
            </Button>
          </Col>
        </Row>
      </Col>
      <Col sm={8} className="pt-5 p-4 mx-auto">
        <Container>
          <Row>
            <Col md={12}>
              <h3>Welcome <span className="text-primary">{user?.username}</span></h3>
            </Col>
            <div className="border w-100 mb-4 mt-4" />
            {activeTab === "dashboard" && <UserDashboard />}
            {activeTab === "profile" && <Profile />}
          </Row>
        </Container>
      </Col>
    </Row>
  );
}

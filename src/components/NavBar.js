import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavBar(props) {
  const user = props.user;

  useEffect(() => {
    if (window.gapi) {
      window.gapi.load("signin2", () => {
        window.gapi.signin2.render("login-button", {
          theme: "dark",
        });
      });
    }
  });

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Gaucho Bike Map</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mr-auto">
            <Nav.Link href="/">Map</Nav.Link>
            <Nav.Link href="/lostandfound">Lost and Found</Nav.Link>
            <Nav.Link href="/forum">Forum</Nav.Link>
            {user && <Nav.Link href="/profile">Profile</Nav.Link>}
          </Nav>

          <Nav>
            {!user ? (
              <div id="login-button" />
            ) : (
              <NavDropdown
                title={
                  <span>
                    Hello, {user.Te}{" "}
                    <img
                      src={user.iJ}
                      alt="profile"
                      style={{ width: "24px", height: "24px" }}
                    />{" "}
                  </span>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={user.signOut}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

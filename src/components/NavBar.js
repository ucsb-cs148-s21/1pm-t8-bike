import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavBar(props) {
  const user = props.user;

  return (
    <Navbar className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">Gaucho Bike Map</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="tab" href="/">Map</Nav.Link>
            <Nav.Link className="tab" href="/lostandfound">Lost and Found</Nav.Link>
            <Nav.Link className="tab" href="/forum">Forum</Nav.Link>
            <Nav.Link className="tab" href="/aboutus">About Us</Nav.Link>
            {user && <Nav.Link className="tab" href="/profile">Profile</Nav.Link>}
          </Nav>

          <Nav>
            {!user ? (
              <div id="login-button" />
            ) : (
              <NavDropdown
                title={
                  <span>
                    Hello, {user.fullName}{" "}
                    <img
                      src={user.imageUrl}
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

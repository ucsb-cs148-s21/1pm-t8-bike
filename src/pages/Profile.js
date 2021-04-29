import React from "react";
import Container from "react-bootstrap/Container";
import Layout from "../components/Layout";
import getUser from "../utils/get-user";

const profileStyle = { maxWidth: "100%", width: "100px", height: "auto" };

export default function Profile() {
  const user = getUser();

  return (
    <Layout user={user}>
      <Container>
        <h1>{user.Ue}</h1>
        <img src={user.iJ} style={profileStyle} alt="profilePic" />
        <div>
          Email: {user.Qt}
        </div>
        <div>
          Blurb: 
        </div>
        <br />
      </Container>
    </Layout>
  );
}

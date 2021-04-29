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
        <h1>{user.fullName}</h1>
        <img src={user.imageUrl} style={profileStyle} alt="profilePic" />
        <div>
          Email: {user.email}
        </div>
        <br />
      </Container>
    </Layout>
  );
}

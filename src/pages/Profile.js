import { Card } from "@material-ui/core";
import React from "react";
import Container from "react-bootstrap/Container";
import Layout from "../components/Layout";
import getUser from "../utils/get-user";
import { bio, itinerary } from "./dataProfile";

const profileStyle = { maxWidth: "100%", width: "100px", height: "auto" };

export default function Profile() {
  const user = getUser();

  var container = [];
  for (let i = 0; i < itinerary.length; i++) {
    var html = (
      <Card style={{width: "18 rem"}}>
        <Card.Body>
          <Card.Title>{threads[i].item}</Card.Title>
          <Card.Subtitle>{threads[i].author}</Card.Subtitle>
          <Card.Text>{threads[i].desc}</Card.Text>
        <Card.Body />
      <Card />
    );
  }

  return (
    <Layout user={user}>
      <Container>
        <h1>{user.fullName}</h1>
        <img src={user.imageUrl} style={profileStyle} alt="profilePic" />
        <div>Email: {user.email}</div>
        <br />
        <div>
          Bio: {bio}
        </div>
        <div>
          Schedule: {container}
        </div>
      </Container>
    </Layout>
  );
}

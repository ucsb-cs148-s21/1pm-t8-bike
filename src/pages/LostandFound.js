import React from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { Button } from "@material-ui/core";
import Card from "react-bootstrap/Card";
import getUser from "../utils/get-user";
import { threads } from "./dataLF";

const cardStyle = { maxWidth: "150px", maxHeight: "150px", width: "auto" };

export default function LostandFound() {
  const user = getUser();
  
  if (user) {
    var createPost = (
      <Button
        data-testid="createPost"
        variant="contained"
        color="primary"
        href="lostandfound/create-post"
      >
        Create Post
      </Button>
    );
  } else {
    createPost = (
      <Button
        data-testid="createPost"
        variant="contained"
        color="primary"
        href="lostandfound/create-post"
        disabled
      >
        Create Post
      </Button>
    );
  }

  console.log(threads);
  var container = [];
  for (let i = 0; i < threads.length; i++) {
    var html = (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" style={cardStyle} src={threads[i].image} />
        <Card.Body>
          <Card.Title>{threads[i].title}</Card.Title>
          <Card.Subtitle>{threads[i].author}</Card.Subtitle>
          <Card.Text>{threads[i].description}</Card.Text>
          <Button variant="primary" onClick="">
            View Route
          </Button>
        </Card.Body>
        <Card.Footer>{threads[i].date}</Card.Footer>
      </Card>
    );

    container.push(html);
    container.push(<br />);
  }

  return (
    <Layout user={user}>
      <Container>
        <h1>Lost and Found</h1>
        <br />
        {createPost}
        <br />
        <br />
        {container}
      </Container>
    </Layout>
  );
}

import React from "react";
import Container from "react-bootstrap/Container";
import Layout from "../components/Layout";
import getUser from "../utils/get-user";
import Card from "react-bootstrap/Card";
import { TextField, Button } from "@material-ui/core"
import { bio, itinerary, cache } from "./dataProfile";

const profileStyle = { maxWidth: "100%", width: "100px", height: "auto" };

export default function Profile() {
  const user = getUser();

  console.log(itinerary);
  var schedule = [];
  for (let i = 0; i < itinerary.length; i++) {
    var html = (
      <Card style={{width: "18 rem"}}>
        <Card.Body>
          <Card.Title>{itinerary[i].course}</Card.Title>
          <Card.Subtitle>{itinerary[i].location}</Card.Subtitle>
          <Card.Text >
            {itinerary[i].days}&nbsp;
            {itinerary[i].start.substr(0,2) % 12}:{itinerary[i].start.substr(2,2)} {parseInt(itinerary[i].start.substr(0,2)) >= 12 ? "pm" : "am"} -&nbsp;
            {itinerary[i].end.substr(0,2) % 12}:{itinerary[i].end.substr(2,2)} {parseInt(itinerary[i].end.substr(0,2)) >= 12 ? "pm" : "am"}
          </Card.Text>
        </Card.Body >
      </Card >
    );
    schedule.push(html);
    schedule.push(<br />);
  }

  console.log(cache);
  var history = [];
  for (let i = 0; i < cache.length; i++) {
    var html = (
      <Card style={{width: "18 rem"}}>
        <Card.Body>
          <Card.Title>{cache[i].title}</Card.Title>
          <Card.Subtitle>{cache[i].category}</Card.Subtitle>
          <Card.Text>{cache[i].description}</Card.Text>
          <Button variant="primary" onClick="">Close Post</Button>
        </Card.Body >
        <Card.Footer>
          {cache[i].date}
        </Card.Footer>
      </Card >
    );
    history.push(html);
    history.push(<br />);
  }

  return (
    <Layout user={user}>
      <Container>
        <h1>{user.fullName}</h1>
        <img src={user.imageUrl} style={profileStyle} alt="profilePic" />
        <br />
        <br />
        <div>Email: {user.email}</div>
        <br />
        <div>Bio: {bio}</div>
        <div>
          <h2>Schedule</h2>
          {schedule}
        </div>
        <div>
          <h2>History</h2>
          {history}
        </div>
      </Container>
    </Layout>
  );
}

import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Layout from "../components/Layout";
import getUser from "../utils/get-user";
import Card from "react-bootstrap/Card";
import { TextField, Button } from "@material-ui/core"
import { bio, itinerary, cache } from "./dataProfile";

const profileStyle = { maxWidth: "100%", width: "100px", height: "auto" };

export default function Profile() {
  const user = getUser();

  console.log()
  function timeFormat(time) {
    if (parseInt(time.substr(0,2)) > 12) {
      var hh = (parseInt(time.substr(0,2)) - 12);
    }
    else if (parseInt(time.substr(0,2)) == 0) {
      hh = 12;
    }
    else {
      hh = time.substr(0,2);
    }
    var mm = time.substr(2,5);
    var mid = (parseInt(time.substr(0,2)) >= 12) ? " pm" : " am" ;
    return hh + mm + " " + mid;
  }

  function deleteCourse() {
    
  }

  function addCourse() {
    if (document.getElementById("course").value !== "" && document.getElementById("location").value !== ""
        && document.getElementById("days") !== "" && (document.getElementById("start").value < document.getElementById("end").value)) {
      var newCourse = {
        course: document.getElementById("course").value,
        location: document.getElementById("location").value,
        days: document.getElementById("days").value,
        start: document.getElementById("start").value,
        end: document.getElementById("end").value
      };
      itinerary.push(newCourse);
      console.log(itinerary);

      //clear all inputs
      document.getElementById("course").value = "";
      document.getElementById("location").value = "";
      document.getElementById("days").value = "";
    }
  }

  console.log(itinerary);
  var schedule = [];
  for (let i = 0; i < itinerary.length; i++) {
    var html = (
      <Card style={{width: "18 rem"}}>
        <Card.Header>
          <Button class="close" onClick="">
            <span aria-hidden="false">&times;</span>
          </Button>
        </Card.Header>
        <Card.Body>
          <Card.Title>{itinerary[i].course}</Card.Title>
          <Card.Subtitle>{itinerary[i].location}</Card.Subtitle>
          <Card.Text >
            {itinerary[i].days} {timeFormat(itinerary[i].start)} - {timeFormat(itinerary[i].end)} 
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
          <Card.Title href={`/forum/${cache[i].id}`}>{cache[i].title}</Card.Title>
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
        <div>
          Bio: {bio}
        </div>
        <br />
        <div>
          <h2>Schedule</h2>
          <form autoComplete="off">
            <TextField required id="course" label="Course" /><br />
            <TextField required id="location" label="Location" /><br />
            <TextField required id="days" label="Days" /><br />
            <TextField
              id="start"
              label="Start"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <TextField
              id="end"
              label="End"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <br />
            <Button onClick={addCourse}>Add</Button>
          </form>
          <br />
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

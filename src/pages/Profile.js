import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Layout from "../components/Layout";
import Card from "react-bootstrap/Card";
import { TextField, Button } from "@material-ui/core"
import axios from "axios";
import getUser from "../utils/get-user";

const profileStyle = { maxWidth: "100%", width: "100px", height: "auto" };

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
  return hh + mm + mid;
}

const Course = props => (
  <div>
    <Card id={props.course._id} style={{width: "18 rem"}}>
        <Card.Header>
          <Card.Button class="close" onClick="deleteCourse">
            <span aria-hidden="false">&times;</span>
          </Card.Button>
        </Card.Header>
        <Card.Body>
          <Card.Title>{props.course.title}</Card.Title>
          <Card.Subtitle>{props.course.location}</Card.Subtitle>
          <Card.Text >
            {props.course.days} {timeFormat(props.course.start)} - {timeFormat(props.course.end)} 
          </Card.Text>
        </Card.Body >
      </Card >
    <br />
  </div>
)

const Post = props => (
  <div>
    <Card style={{width: "18 rem"}}>
      <Card.Body>
        <Card.Title href={`/forum/${props.post._id}`}>{props.post.title}</Card.Title>
        <Card.Subtitle>{props.post.category}</Card.Subtitle>
        <Card.Text>{props.post.description}</Card.Text>
        <Button variant="primary" onClick="">Close Post</Button>
      </Card.Body >
      <Card.Footer>
        {props.post.date}
      </Card.Footer>
    </Card >
    <br />
  </div>
)

export default class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {bio: "", courses: [], posts: [], user: getUser(), exists: false};
    //this.isLoggedIn = getUser();
  }
  
  // this function grabs user info from db, if it exists
  componentDidMount(){
    console.log(this.state.user);
    axios.get(`http://localhost:3001/users/${this.state.user.email}`) //get request
      .then(res=>{
        this.setState({bio: res.data.bio, courses: res.data.itinerary, exists: true}) //sets posts array to db array
      })
      .catch(err => {
        console.log(err);
      })
    if (!this.state.exists) {
      axios.post(`http://localhost:3001/users/${this.state.user.email}`) //post request
        .then(res => console.log(res.data));
      axios.get(`http://localhost:3001/users/${this.state.user.email}`) //get request
        .then(res=>{
          this.setState({bio: res.data.bio, courses: res.data.itinerary, exists: true}) //sets posts array to db array
        })
        .catch(err => {
          console.log(err);
        })
    }
    axios.get(`http://localhost:3001/posts/${this.state.user.email}`) //get request
      .then(res=>{
        this.setState({posts: res.data.posts}) //sets posts array to db array
      })
      .catch(err => {
        console.log(err);
      })
  }// end componentDidMount

  itinerary(){
    if (this.state.courses) {
      return this.state.courses.map(currCourse => {
        return <Course course = {currCourse}/>
      })
    }
  }

  cache(){
    if (this.state.posts) {
      return this.state.posts.map(currPost => {
        return <Post post = {currPost}/>
      })
    }
  }

  timeFormat(time) {
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
    return hh + mm + mid;
  }

  //deleteCourse() {
  //  axios.delete(`http://localhost:3001/users/${this.state.user.email}/delete`);
  //}

  addCourse() {
    if (document.getElementById("course").value !== "" && document.getElementById("location").value !== ""
        && document.getElementById("days") !== "" && (document.getElementById("start").value < document.getElementById("end").value)) {
      const formData = new FormData();
      formData.append("title", document.getElementById("title").value);
      formData.append("location", document.getElementById("location").value);
      formData.append("days", document.getElementById("days").value);
      formData.append("start", document.getElementById("start").value);
      formData.append("end", document.getElementById("end").value);
      
      axios.post(`http://localhost:3001/users/${this.state.user.email}/add-course`,formData)
        .then(res => console.log(res.data))

      //clear all inputs
      document.getElementById("course").value = "";
      document.getElementById("location").value = "";
      document.getElementById("days").value = "";
    }
  }

  render(){
    return (
      <Layout user={this.state.user}>
        <Container>
          <h1>{this.state.user.fullName}</h1>
          <img src={this.state.user.imageUrl} style={profileStyle} alt="profilePic" />
          <br />
          <br />
          <div>Email: {this.state.user.email}</div>
          <br />
          <div>
            Bio: {this.state.bio}
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
              <Button onClick="addCourse">Add</Button>
            </form>
            <br />
            {this.itinerary()}
          </div>
          <div>
            <h2>History</h2>
            {this.cache()}
          </div>
        </Container>
      </Layout>
    );
  }
}

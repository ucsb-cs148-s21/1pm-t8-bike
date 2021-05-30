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
  else if (parseInt(time.substr(0,2)) === 0) {
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
    <Card style={{width: "18 rem"}}>
        <Card.Header>
          <Card.Button id={props.course._id} class="close" onClick={this.deleteCourse}>
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
        <Card.Link href={`/forum/${props.post._id}`}>
          <Card.Title>{props.post.title}</Card.Title>
        </Card.Link>
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
    this.state = {bio: "", courses: [], posts: [], user: getUser()};
    this.handleChangeBio = this.handleChangeBio.bind(this)
    this.addCourse = this.addCourse.bind(this)
    this.deleteCourse = this.deleteCourse.bind(this)
  }
  
  // this function grabs user info from db, if it exists
  componentDidMount(){
    console.log(this.state.user);
    axios.get(`/users/${this.state.user.email}/exists`) //get request
      .then(res => console.log(res.data))

    axios.get(`/users/${this.state.user.email}`) //get request
      .then(res => {
        this.setState({bio: res.data.bio, courses: res.data.itinerary}) //sets bio and courses array to db
      })
      .catch(err => {
        console.log(err);
      })

    axios.get(`/posts/email/${this.state.user.email}`) //get request
      .then(res => {
        this.setState({posts: res.data}) //sets posts array to db array
      })
      .catch(err => {
        console.log(err);
      })
  }// end componentDidMount

  handleChangeBio(e) {
    this.setState({
      bio: e.target.value
    })
    const formData = new FormData();
    formData.append("bio", e.target.value); 
    axios.post(`/users/${this.state.user.email}/update-bio`, formData) //post request
      .then(res => console.log(res.data));
  }

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

  deleteCourse(e) {
    axios.delete(`/users/${this.state.user.email}/delete-course/${e.target.id}`)
      .then(res => console.log(res.data))
  }

  addCourse() {
    if (document.getElementById("title").value !== "" && document.getElementById("location").value !== ""
        && document.getElementById("days").value !== "" && (document.getElementById("start").value < document.getElementById("end").value)) {
      const formData = new FormData();
      formData.append("title", document.getElementById("title").value);
      formData.append("location", document.getElementById("location").value);
      formData.append("days", document.getElementById("days").value);
      formData.append("start", document.getElementById("start").value);
      formData.append("end", document.getElementById("end").value);
      
      axios.post(`/users/${this.state.user.email}/add-course`, formData)
        .then(res => console.log(res.data))

      //clear all inputs
      document.getElementById("title").value = "";
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
            Bio: <input type="text" name="bio" value={this.state.bio} placeholder="Tell us about yourself" onChange={this.handleChangeBio}/>
          </div>
          <br />
          <div>
            <h2>Schedule</h2>
            <form autoComplete="off">
              <TextField required id="title" label="Title" /><br />
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
              <Button onClick={this.addCourse}>Add</Button>
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

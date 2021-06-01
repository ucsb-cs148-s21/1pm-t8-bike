import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Layout from "../components/Layout";
import Card from "react-bootstrap/Card";
import { TextField, Button } from "@material-ui/core"
import axios from "axios";
import getUser from "../utils/get-user";
import { Building } from "../api/models/building.model";

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
          <Card.Button class="close" onClick={() => {props.deleteCourse()}}>
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
        <Button variant="primary" onClick={() => {props.closePost()}}>Close Post</Button>
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
    this.state = {bio: "",
                  courses: [],
                  posts: [],
                  title: "",
                  location: "Home",
                  days: {
                    M: false,
                    T: false,
                    W: false,
                    R: false,
                    F: false,
                    Sa: false,
                    Su: false,
                  },
                  start: "",
                  end: "",
                  buildings: [],
                  user: getUser()};
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.closePost = this.closePost.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.updateBio = this.updateBio.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDays = this.onChangeDays.bind(this);
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  // this function grabs user info from db, if it exists
  componentDidMount(){
    console.log(this.state.user);
    axios.get(`/users/${this.state.user.email}/exists`) //get request
      .then(res => {
        console.log(res.data)
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

        axios.get('/buildings') //get request
          .then(res => {
            this.setState({buildings: res.data}) //sets buildings array to db array
          })
          .catch(err => {
            console.log(err);
          })
        })
      .catch(err => {
        console.log(err);
      })
     
  }// end componentDidMount

  updateBio(e) {
    this.setState({
      bio: e.target.value
    })
    axios.post(`/users/${this.state.user.email}/update-bio`, e.target.value) //post request
      .then(res => console.log(res.data));
  }

  closePost(e) {
    const formData = new FormData();
    axios.get(`/posts/${e}`)
      .then(res => {
        formData.append("title", res.data.title);
        formData.append("category", res.data.category);
        formData.append("username", res.data.username);
        formData.append("description", res.data.description);
        formData.append("img", res.data.img);
        formData.append("status", "CLOSED");
        formData.append("date", res.data.date);
        axios.post(`/posts/update/${e}`, formData)
          .then(res => console.log(res.data))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err));
    axios.get(`/posts/email/${this.state.user.email}`) //get request
      .then(res => {
        this.setState({posts: res.data}) //sets posts array to db array
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteCourse(e) {
    axios.delete(`/users/${this.state.user.email}/delete-course/${e.target.value}`)
      .then(res => console.log(res.data))
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  
  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }  

  onChangeDays(e) {
    this.setState({
      days: e.target.value
    });
  }  

  onChangeStart(e) {
    this.setState({
      start: e.target.value
    });
  }  

  onChangeEnd(e) {
    this.setState({
      end: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const lat = 0;
    const lng = 0;
    const name = "";

    axios.get(`/buildings/${this.state.location}`)
      .then(res => {
        lat = res.data.lat;
        lng = res.data.lng;
        name = res.data.name;
      })
      .catch(err => console.log(err));
    
    const newBuilding = new Building({lat, lng, name});
    
    const formData = new FormData;
    formData.append("title", this.state.title)
    formData.append("location", newBuilding);
    formData.append("days", this.state.days);
    formData.append("start", this.state.start);
    formData.append("end", this.state.end);
    
    axios.post(`/users/${this.state.user.email}/add-course`, formData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  itinerary(){
    if (this.state.courses) {
      return this.state.courses.map(currCourse => {
        return <Course key = {currCourse._id}
                       post = {currCourse}
                       deleteCourse={() => this.deleteCourse(currCourse._id)}/>
      })
    }
  }

  cache(){
    if (this.state.posts) {
      return this.state.posts.map(currPost => {
        return <Post key = {currPost._id}
                     post = {currPost}
                     closePost={() => this.closePost(currPost._id)}/>
      })
    }
  }

  render(){
    console.log(this.state.buildings);
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
            Bio: <input type="text" name="bio" value={this.state.bio} placeholder="Tell us about yourself" onChange={this.updateBio}/>
          </div>
          <br />
          <div>
            <h2>Schedule</h2>
            <form autoComplete="off">
              <TextField required id="title" label="Title" value={this.state.title} onChange={this.onChangeTitle}/><br />
              {/* <TextField required id="location" label="Location" /><br /> */}
              <label>Location: </label>
              <select required
                      id="location" 
                      className="form-control" 
                      value={this.state.location}
                      onChange={this.onChangeLocation}>
                {
                  this.state.buildings.map(building => {
                    return <option key = {building.name} value = {building.name}>{building.name.replace(/-/g," ")}</option>
                  })
                }
              </select>
              <TextField required id="days" label="Days" onChange = {this.onChangeDays}/><br />
              <TextField
                id="start"
                label="Start"
                type="time"
                defaultValue="07:30"
                onChange = {this.onChangeStart}
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
                onChange = {this.onChangeEnd}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              <br />
              <Button onClick={this.onSubmit}>Add</Button>
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

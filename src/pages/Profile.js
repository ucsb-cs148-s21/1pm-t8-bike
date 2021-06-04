import React, {Component, useState} from "react";
import Container from "react-bootstrap/Container";
import Layout from "../components/Layout";
import {Card} from "react-bootstrap";
import { TextField, Button } from "@material-ui/core"
import axios from "axios";
import getUser from "../utils/get-user";

const profileStyle = { maxWidth: "100%", width: "100px", height: "auto" };

function dayFormat(days) {
  var week = "";
  if (days.M) {
    week += "M";
  }
  if (days.T) {
    week += "T";
  }
  if (days.W) {
    week += "W";
  }
  if (days.R) {
    week += "R";
  }
  if (days.F) {
    week += "F";
  }
  if (days.Sa) {
    week += "Sa";
  }
  if (days.Su) {
    week += "Su";
  }
  return week;
}

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
          <Button class="close" onClick={() => {props.deleteCourse()}}>
            <span aria-hidden="false">&times;</span>
          </Button>
        </Card.Header>
        <Card.Body>
          <Card.Title>{props.course.title}</Card.Title>
          <Card.Subtitle>{props.course.location.name.replace(/-/g," ")}</Card.Subtitle>
          <Card.Text >
            {dayFormat(props.course.days)} {timeFormat(props.course.start)} - {timeFormat(props.course.end)} 
          </Card.Text>
        </Card.Body >
      </Card >
    <br />
  </div>
  //also change props.course.days cuz that also throws an error
)

const Post = props => (
  <div>
    <Card style={{width: "18 rem"}}>
      <Card.Body>
        <Card.Link href={`/forum/${props.post._id}`}>
          <Card.Title>{props.post.title}</Card.Title>
        </Card.Link>
        <Card.Subtitle>{props.post.category} {props.post.status === "CLOSED" && ` - ${props.post.status}`}</Card.Subtitle> 
        <Card.Text>{props.post.description}</Card.Text>
        <Button variant="contained" onClick={() => {props.changeStatus()}}>Change Status</Button>
      </Card.Body >
      <Card.Footer>
        {props.post.date.substring(0,10)}
      </Card.Footer>
    </Card >
    <br />
  </div>
)

//comment component that will list out
const ViewBio = props => (
  <div>
    {props.bio}
    <br></br>
    <button onClick={() => {props.editBio()}}>Update</button>
  </div>
)

//comment component that will create edit comp
const EditBio = props => {
  //setting state var
  const [bio, setBio] = useState(props.bio);
  
  //setting on change
  function onChangeBio(e){
      setBio(e.target.value);
  }

  function onSubmitEditBio(e){   
      e.preventDefault();

      //update to db
      axios.post(`/users/${props.email}/update-bio`, {bio: bio})
          .then(res => {               
               props.afterOnSubmitEditBio();
          })

      //should go back to normal submissions
  }

  //setting onSubmit
  return (
    <div>
      <input id="bio" value={bio} placeholder="Tell us about yourself" onChange={onChangeBio}/>
      <br></br>
      <button onClick={onSubmitEditBio}>Save</button>
      <button onClick={props.cancelBio}>Cancel</button>
    </div>
  );
}

export default class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {bio: "",
                  courses: [],
                  posts: [],
                  title: "",
                  location: "",
                  M: false,
                  T: false,
                  W: false,
                  R: false,
                  F: false,
                  Sa: false,
                  Su: false,
                  start: "07:30",
                  end: "07:30",
                  buildings: [],
                  isLoading:false,
                  isEditing:false,
                  user: getUser()};
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.afterOnSubmitEditBio = this.afterOnSubmitEditBio.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeMon = this.onChangeMon.bind(this);
    this.onChangeTue = this.onChangeTue.bind(this);
    this.onChangeWed = this.onChangeWed.bind(this);
    this.onChangeThu = this.onChangeThu.bind(this);
    this.onChangeFri = this.onChangeFri.bind(this);
    this.onChangeSat = this.onChangeSat.bind(this);
    this.onChangeSun = this.onChangeSun.bind(this);
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.itinerary = this.itinerary.bind(this);
  }
  
  // this function grabs user info from db, if it exists
  componentDidMount(){
    console.log(this.state.user);
    axios.get(`/users/${this.state.user.email}/exists`) //get request
      .then(res => {
        console.log(res.data)
        axios.get(`/users/${this.state.user.email}`) //get request
          .then(res => {
            this.setState({bio: res.data.bio}) //sets bio and courses array to db
            axios.get(`/users/${this.state.user.email}/courses`) //get request
              .then(res => {
                console.log(res.data)
                this.setState({courses: res.data}) //sets bio and courses array to db
                
              })
              .catch(err => {
                console.log(err);
              })
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

        axios.get(`/posts/email/${this.state.user.email}`) //get request
          .then(res => {
            this.setState({posts: res.data}) //sets posts array to db array
          })
          .catch(err => {
            console.log(err);
          })
        })
      .catch(err => {
        console.log(err);
      })
      console.log("Courses:" + this.state.courses);
  }// end componentDidMount

  displayBio(){
    if(this.state.isEditing){
      return <EditBio key={this.state.user.email}
                      email = {this.state.user.email}
                      bio={this.state.bio}
                      afterOnSubmitEditBio={this.afterOnSubmitEditBio}
                      cancelBio={() => this.setState({isEditing: false})}
                      ></EditBio>
    } else {
      return <ViewBio key={this.state.user.email}
                      bio={this.state.bio}
                      editBio={() => this.setState({isEditing:true})}></ViewBio>
    }
  }

  afterOnSubmitEditBio(){
    axios.get(`/users/${this.state.user.email}`) //get request
      .then(res => {
        this.setState({bio: res.data.bio, isEditing: false})
      })
  }

  changeStatus(e) {
    const formData = new FormData();
    axios.get(`/posts/${e}`)
      .then(res => {
        formData.append("title", res.data.title);
        formData.append("category", res.data.category);
        formData.append("displayname",res.data.displayname);
        formData.append("username", res.data.username);
        formData.append("description", res.data.description);
        formData.append("img", res.data.img);
        if(res.data.status === "CLOSED"){          
          formData.append("status", "OPEN");        
        }
        else if(res.data.status === "OPEN"){          
            formData.append("status", "CLOSED");        
        }
        else{
            formData.append("status","");
        }
        formData.append("date", res.data.date);

        axios.post(`/posts/update/${e}`, formData)
          .then(res => { 
              axios.get(`/posts/email/${this.state.user.email}`) //get request
                  .then(res => {
                    this.setState({posts: res.data}) //sets posts array to db array
                  })
                  .catch(err => {
                    console.log(err);
                  })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err));
   
  }

  deleteCourse(id) {
    axios.delete(`/users/${this.state.user.email}/delete-course/${id}`)
      .then(res => {
        axios.get(`/users/${this.state.user.email}/courses`)
          .then(res => {
            this.setState({courses: res.data})
          })
      })
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

  onChangeMon(e) {
    this.setState({
      M: e.target.checked
    });
  }

  onChangeTue(e) {
    this.setState({
      T: e.target.checked
    });
  }  
  
  onChangeWed(e) {
    this.setState({
      W: e.target.checked
    });
  }  
  
  onChangeThu(e) {
    this.setState({
      R: e.target.checked
    });
  }  

  onChangeFri(e) {
    this.setState({
      F: e.target.checked
    });
  }  

  onChangeSat(e) {
    this.setState({
      Sa: e.target.checked
    });
  }  

  onChangeSun(e) {
    this.setState({
      Su: e.target.checked
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
    this.setState({isLoading:true},() => {
      e.preventDefault();

      axios.get(`/buildings/${this.state.location}`)
        .then(res => {
          const days = {
            M: this.state.M,
            T: this.state.T,
            W: this.state.W,
            R: this.state.R,
            F: this.state.F,
            Sa: this.state.Sa,
            Su: this.state.Su
          }
          // const formData = new FormData();
          // formData.append("title", this.state.title)
          // formData.append("location", res.data);
          // formData.append("days", days);
          // formData.append("start", this.state.start);
          // formData.append("end", this.state.end);

          const course = {
            title: this.state.title,
            location: res.data,
            days: days,
            start: this.state.start,
            end: this.state.end
          }
    
          axios.post(`/users/${this.state.user.email}/add-course`, course)
            .then(res => {
              console.log(res.data);
              this.setState({isLoading: false});
              window.alert("Course Added!");
              axios.get(`/users/${this.state.user.email}/courses`)
                .then(res => {
                  this.setState({courses: res.data})
                })
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
  }

  itinerary(){
    return this.state.courses.map(currCourse => {
      return <Course key = {currCourse._id}
                     course = {currCourse}
                     deleteCourse={() => this.deleteCourse(currCourse._id)}/>
    })
  }

  cache(){
    if (this.state.posts) {
      return this.state.posts.map(currPost => {
        return <Post key = {currPost._id}
                     post = {currPost}
                     changeStatus={() => this.changeStatus(currPost._id)}/>
      })
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
          <div>
            Email: {this.state.user.email}
          </div>
          <br />
          <div>
            Bio: {this.displayBio()}
          </div>
          <br />
          <div>
            <h2>Schedule</h2>
            <form autoComplete="off">
              <label>Title:</label><br />
              <input id="title" value={this.state.title} onChange={this.onChangeTitle}/><br />
              {/* <TextField required id="location" label="Location" /><br /> */}
              <label>Location: </label>
              <select required
                      id="location" 
                      className="form-control" 
                      value={this.state.location}
                      onChange={this.onChangeLocation}>
                <option value="">-- Choose One --</option>
                {
                  this.state.buildings.map(building => {
                    return <option key = {building.name} value = {building.name}>{building.name.replace(/-/g," ")}</option>
                  })
                }
              </select>
              {/* <TextField required id="days" label="Days" onChange = {this.onChangeDays}/><br /> */}
              <label>Days: </label>
              <div class="form-control" onChange={this.onChangeDays}>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="mon" value="" onChange={this.onChangeMon}/>
                  <label class="form-check-label" for="mon">M</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="tue" value="" onChange={this.onChangeTue}/>
                  <label class="form-check-label" for="tue">T</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="wed" value="" onChange={this.onChangeWed}/>
                  <label class="form-check-label" for="wed">W</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="thu" value="" onChange={this.onChangeThu}/>
                  <label class="form-check-label" for="thu">R</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="fri" value="" onChange={this.onChangeFri}/>
                  <label class="form-check-label" for="fri">F</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="sat" value="" onChange={this.onChangeSat}/>
                  <label class="form-check-label" for="sat">Sa</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="sun" value="" onChange={this.onChangeSun}/>
                  <label class="form-check-label" for="sun">Su</label>
                </div>
              </div>
              <br />
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
              />&nbsp;&nbsp;&nbsp;
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
              <Button variant="contained" onClick={this.onSubmit}>Add</Button>
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

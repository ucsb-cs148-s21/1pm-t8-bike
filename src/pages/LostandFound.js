import React, {Component} from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { Button } from "@material-ui/core";
import Card from "react-bootstrap/Card";
import getUser from "../utils/get-user";

const cardStyle = { maxWidth: "150px", maxHeight: "150px", width: "auto" };

const LFPost = props => (
  <div>
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" style={cardStyle} src={`${props.post.img}`} alt={`${props.post.img}`} />
      <Card.Body>
        <Card.Title>
          <Card.Link href={`/forum/${props.post._id}`}>
            {props.post.title}
          </Card.Link>
        </Card.Title>
        <Card.Subtitle>{props.post.displayname}</Card.Subtitle>
        <Card.Text>{props.post.description}</Card.Text>
        <Button variant="primary">
          View Route
        </Button>
      </Card.Body>
      <Card.Footer>{props.post.date}</Card.Footer>
    </Card>
    <br />
  </div>
)

export default class LostandFound extends Component{
  constructor(props){
    super(props);
    this.state = {posts: [], user: getUser()};
    //this.isLoggedIn = getUser();
  }
  

  // this function grabs the list of LF posts from db
  componentDidMount(){
    console.log(this.state.user);
    axios.get('/posts/Lost-And-Founds') //get request
         .then(res=>{
           this.setState({posts: res.data}) //sets posts array to db array
         }) 
         .catch(err => {
           console.log(err);
         })
  }// end componentDidMount

  // returns each individual post component
  LFThread(){
    return this.state.posts.map(currPost => {
      return <LFPost key={currPost._id} 
                     post = {currPost}/>
    })
  }// end LFThread

  //checks to see if logged in
  createPost(){
    if (this.state.user) {
      return (
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
      return (
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
  }
  
  render(){
    return(
      <Layout user={this.state.user}>
        <Container>
          <h1>Lost and Found</h1>
          <br />
          {this.createPost()}
          <br />
          <br />
          {this.LFThread()}
        </Container>
      </Layout>
    );
  }
}

// export default function LostandFound() {
//   const user = getUser();

//   var container = [];
//   console.log(threads);
//   var container = [];
//   for (let i = 0; i < threads.length; i++) {
//     var html = (
//       <Card style={{ width: "18rem" }}>
//         <Card.Img variant="top" style={cardStyle} src={threads[i].image} />
//         <Card.Body>
//           <Card.Title>{threads[i].title}</Card.Title>
//           <Card.Subtitle>{threads[i].author}</Card.Subtitle>
//           <Card.Text>{threads[i].description}</Card.Text>
//           <Button variant="primary" onClick="">
//             View Route
//           </Button>
//         </Card.Body>
//         <Card.Footer>{threads[i].date}</Card.Footer>
//       </Card>
//     );

//     container.push(html);
//     container.push(<br />);
//   }
// }
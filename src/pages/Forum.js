import Layout from "../components/Layout";
import React, {Component} from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import { threads } from "./data";

//const textStyle = {maxWidth: "100%", width: "700px"}

// this is the main page of forum, see list of posts

// Post Component
const Post = props => (
  <li className="row">
    <a href={`/forum/${props.post._id}`}>
      <h4 className="title">
        {props.post.title} <small>{props.post.category} { props.post.status == 'CLOSED' && ' - ' + props.post.status}</small> 
      </h4>
      <div className="bottom">
        <p className="info-line">
            <span className="author">{props.post.username}</span> - <span className="date">{props.post.date.substring(0,10)}</span> - <span className="comment-count">{props.post.numComments} comments</span>
        </p>
      </div>
    </a>
    <p className="buttons" style={{"font-size":"10px"}}>
        <input type="button" value="Delete Post" style={{float: "center"}} onClick={() => {props.deletePost()}}/> <input type="button" value="Edit Post" style={{float: "center"}} onClick={() => {props.editPost()}}/>
    </p>
  </li>
)

// this component will list out all the posts created
export default class ForumPost extends Component{
  constructor(props){
    super(props);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.state = {posts: [],user: getUser()};
    //this.isLoggedIn = getUser();
  }
  
  // this function grabs the list of posts from db
  componentDidMount(){
    console.log(this.state.user);
    axios.get('http://localhost:3001/posts') //get request
         .then(res=>{
           this.setState({posts: res.data}) //sets posts array to db array
         }) 
         .catch(err => {
           console.log(err);
         })
  }// end componentDidMount

   /*
    delete post will delete the item from db and redirect to forums main page with msg that
    says 'Post deleted!'
    */
  deletePost(id){
      axios.delete(`http://localhost:3001/posts/${id}`)
           .then(res => {
               console.log(res.data)
               //update post
               axios.get('http://localhost:3001/posts') //get request
                    .then(res=>{
                      this.setState({posts: res.data}) //sets posts array to db array
                    }) 
                    .catch(err => {
                      console.log(err);
                    })
           })
           .catch(err =>{
               console.log('Error: ' + err);
           })
      
      console.log("delPost");
      window.location = '/forum';
  }

  /* edit the post: redirect to createPost page with every info in to resumbit,, after
  submit goes back to post page, NOT the main page */
  editPost(id){
      //go to edit post page
      console.log("editPost");
      window.location = `/forum/edit-post/${id}`;
  }

  /* change the status, if open -> closed, closed -> open */
  changeStatus(){
      //when clicked will check state status, if closed=>open, open=>closed
      //do an update in db and get post again
      const updatedStatus = new FormData();
      updatedStatus.append("username", this.state.username);
      updatedStatus.append("category", this.state.category);
      updatedStatus.append("title", this.state.title);
      updatedStatus.append("description", this.state.description);
      updatedStatus.append("date", this.state.date);
      updatedStatus.append("img", this.state.img);
      updatedStatus.append("numComments", this.state.numComments);
      updatedStatus.append("comments", this.state.comments);

      if(this.status === "CLOSED"){          
          updatedStatus.append("status", "OPEN");        
      }
      else if(this.status === "OPEN"){          
          updatedStatus.append("status", "CLOSED");        
      }
      else{
          updatedStatus.append("status","");
      }

      axios.post(`http://localhost:3001/posts/update/${this.postID}`,updatedStatus)
          .then(res => {
          console.log(res.data); 
          })

      //re get the post info and update, no need to update comments as its the same
      axios.get(`http://localhost:3001/posts/${this.postID}`)
      .then(res=>{
          console.log("compDidMount: get post from db");
          this.setState({post: res.data})
      })
      .catch(err => {
          console.log(err);
      })
  
  }

  // returns each individual post component
  postList(){
    return this.state.posts.map(currPost => {
      return <Post post = {currPost}
                   key = {currPost._id}
                   deletePost={() => this.deletePost(currPost._id)}
                   editPost={() => this.editPost(currPost._id)}
             />
    })

  }// end postList

  //checks to see if logged in
  permCreatePost(){
      if(this.isLoggedIn){
        return(
            <div className="createPostBtn">
                <a href="forum/create-post">
                    Create New Post
                </a>
                <br></br>
            </div>
        );
      }
      else{
        return(
          <div className="createPostBtn"/>           
        );
      }
  }
      
  render(){
    return(
      <Layout user={this.state.user}>
        <Container>
          <h1><a href="/forum" style={{"text-decoration": "none", "color":"inherit"}}>Bike Forum</a></h1>
          <br></br>
          <div className="main">
            {/* Create new post (should only be for users) */}
            
            { <div className="createPostBtn">
              { this.state.user && <a href="forum/create-post">Create New Post</a>}  
              { this.state.user && <br></br>}       
            </div> } 
            {/* <pre>{JSON.stringify(this.state.user, null, 2)}</pre> */}
          
            <ol>
              {this.postList()} {/*rendering all of container list elements*/}
            </ol>
          </div>
        </Container>
      </Layout>
    );
  }
}

import Layout from "../components/Layout";
import React, {Component} from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import { threads } from "./data";

//const textStyle = {maxWidth: "100%", width: "700px"}

// this is the main page of forum, see list of posts
// export default function Forum() {
//   const user = getUser();
//   //<script src="data.js"></script>

//   console.log(threads);
//   var container = [];
//   for (let i = 0; i < threads.length; i++) {
//     var html = 
//       <li class="row">
//         <a href={`/forum/${threads[i].id}`}>
//           <h4 class="title">
//             {threads[i].title} <small>{threads[i].category}</small>
//           </h4>
//           <div class="bottom">
//             <p class="info-line">
//                 <span class="author">Author</span> - <span class="date">{new Date(threads[i].date).toLocaleString()}</span> - <span class="comment-count">{threads[i].comments.length} comments</span>
//             </p>
//           </div>
//         </a>
//       </li>

//     container.push(html);
//   }

//     //checks to see if logged in
//     var permCreatePost =
//         <div class="createPostBtn">
            
//         </div>;
//     if(user){
//         permCreatePost = 
//             <div class="createPostBtn">
//                 <a href="forum/create-post">
//                     Create New Post
//                 </a>
//                 <br></br>
//             </div>
//     }

//   return (
//     <Layout user={user}>
//       <Container>
//         <h1>Bike Forum</h1>
//         <br></br>
//         <div class="main">
//           {/* Create new post (should only be for users) */}

//           {permCreatePost}

//           <ol>
//             {container} {/*rendering all of container list elements*/}
//           </ol>
//         </div>
//       </Container>
//     </Layout>
//   );
// }      

const user = getUser();
// Post Component
const Post = props => (
  <li class="row">
    <a href={`/forum/${props.key}`}>
      <h4 class="title">
        {props.post.title} <small>{props.post.category}</small>
      </h4>
      <div class="bottom">
        <p class="info-line">
            <span class="author">{props.post.username}</span> - <span class="date">{props.post.date.substring(0,10)}</span> - <span class="comment-count">{props.post.numComments} comments</span>
        </p>
      </div>
    </a>
  </li>
)

// this component will list out all the posts created
export default class ForumPost extends Component{
  constructor(props){
    super(props);
    this.state = {posts: []};
    //this.isLoggedIn = getUser();
  }

  // this function grabs the list of posts from db
  componentDidMount(){
    axios.get('http://localhost:3001/posts') //get request
         .then(res=>{
           this.setState({posts: res.data}) //sets posts array to db array
         }) 
         .catch(err => {
           console.log(err);
         })
  }// end componentDidMount

  // returns each individual post component
  postList(){
    return this.state.posts.map(currPost => {
      return <Post post = {currPost}
                   key = {currPost._id}
             />
    })

  }// end postList

  //checks to see if logged in
  permCreatePost(){
      if(this.isLoggedIn){
        return(
            <div class="createPostBtn">
                <a href="forum/create-post">
                    Create New Post
                </a>
                <br></br>
            </div>
        );
      }
      else{
        return(
          <div class="createPostBtn"/>           
        );
      }
  }
      
  render(){
    return(
      <Layout user={user}>
        <Container>
          <h1>Bike Forum</h1>
          <br></br>
          <div class="main">
            {/* Create new post (should only be for users) */}

            {/* <div class="createPostBtn">
              { user && <a href="forum/create-post">Create New Post</a>}  
              { user && <br></br>}       
            </div> */}

            <ol>
              {this.postList()} {/*rendering all of container list elements*/}
            </ol>
          </div>
        </Container>
      </Layout>
    );
  }
}

import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import {threads} from "./data";
import { useParams } from "react-router";
import { Switch, Route } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const textStyle = {maxWidth: "100%", width: "700px"}


// this is when you click on a post
export default function ForumPost() {
  const user = getUser();


  let postID = parseInt(useParams().id) - 1;

  console.log("The post id is " + postID);
  console.log("threads length: " + threads.length);

  //check if postId is within threads length
  if(postID >= threads.length){
      console.log("inside the if statement");
      
      return <PageNotFound/> 
  }

  /*creates template for all comments to be posted*/
  var commentList = [];
    for(let i = 0; i < threads[postID].comments.length; i++){
        var commentPost = 
            <li class="comment">
                <div class="comment-header">
                    <p class="comment-header">
                        <span class="user">{threads[postID].comments[i].author}</span> - <small class="date"> {new Date(threads[postID].comments[i].date).toLocaleString()}</small>
                    </p>
                </div>
                <div class="comment-content">
                    {threads[postID].comments[i].content}
                </div>
                <hr></hr>
            </li>
            
            commentList.push(commentPost);
    } //end for loop

    /*creates template for the main post*/
    var rootPost = 
        <div class="header-root-post">
            <h4 class="title">
                {threads[postID].title}
            </h4>  
            <div class="root-content">
                {threads[postID].content}
            </div>
            <div class="bottom">
                <p class="info-line">
                    <span class="author">{threads[postID].author}</span> - <span class="date">{new Date(threads[postID].date).toLocaleString()}</span> - <span class="comment-count">{threads[postID].comments.length} comments</span>
                </p>
            </div>
        </div> 
            
         


  return (
    <Layout user={user}>
      <Container>
        <h1> 
            Bike Forum
        </h1>
        <br></br>
        

         <body>
             <div class="root">
             {rootPost}
             </div>
        
            <hr></hr>

            <textarea>Add a comment</textarea>
            <button>Post</button>

            <hr></hr>
            {/*print out the comments array*/}
            <div class="comments">
                <ul>
                    {commentList}
                </ul>
            </div> 
        </body>
      </Container>
    </Layout>
  );
}
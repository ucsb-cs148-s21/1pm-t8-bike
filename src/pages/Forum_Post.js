import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import React, { useState } from 'react';
import {threads} from "./data";
import { useParams } from "react-router";
import PageNotFound from "./PageNotFound";

//const textStyle = {maxWidth: "100%", width: "700px"}

// this is when you click on a post
export default function ForumPost() {
    
    //var CommentList = [];
    const user = getUser();

    let postID = parseInt(useParams().id) - 1;
    //creating hook for list
    var initialCommentList = [];
    for(let i = 0; i < threads[postID].comments.length; i++){
        initializeCommentList(threads[postID].comments[i]);
    } //end for loop

    const [commentList, setCommentList] = useState(initialCommentList);
    // first initialize the commentList with existing comments
    function initializeCommentList(comment){
        var commentPost = 
            <div class="comment">
                <div class="comment-header">
                    <p class="comment-header">
                        <span class="user">{comment.author}</span> - <small class="date"> {new Date(comment.date).toLocaleString()}</small>
                    </p>
                </div>
                <div class="comment-content">
                    {comment.content}
                </div>
                <hr></hr>
            </div>
        

        //adding comment and then rerendering
        initialCommentList.push(commentPost);     
    }
  //console.log("The post id is " + postID);
  //console.log("threads length: " + threads.length);

  //check if postId is within threads length
    if(postID >= threads.length){
      //console.log("inside the if statement");  
      //does the line below create a render or component of pagenotfound?     
      return <PageNotFound/> 
    }

    //adding new comments to post
    function createComment(){
        var txt = document.getElementById('addCommentTextArea');
        if(txt.value !== ''){
            console.log(txt.value);
            // comment obj properties
            var comment = {
                author: 'Placeholder',
                date: Date.now(),
                content: txt.value
            }  
            addComment(comment);
            console.log(commentList);
            txt.value = '';
            threads[postID].comments.push(comment);
        } //checks if txtbox is not empty
    }

    // add an existing obj comment to commentList
    //var commentList = [];
    function addComment(comment){
        var commentPost = 
            <div class="comment">
                <div class="comment-header">
                    <p class="comment-header">
                        <span class="user">{comment.author}</span> - <small class="date"> {new Date(comment.date).toLocaleString()}</small>
                    </p>
                </div>
                <div class="comment-content">
                    {comment.content}
                </div>
                <hr></hr>
            </div>
        
        console.log(commentList);
        //adding comment and then rerendering
        setCommentList(commentList => [...commentList, commentPost]);     
    }

  /*creates template for all comments currently in post to be on website*/
    // for(let i = 0; i < threads[postID].comments.length; i++){
    //     addComment(threads[postID].comments[i]);
    // } //end for loop

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

        //check user permissions for making comments
        var permCreateComment = 
            <div class="createCommentBtn">
                    
            </div>;
        if(user){
            permCreateComment = 
                <div class="createCommentBtn">
                    <textarea id="addCommentTextArea" placeholder="Add a comment."></textarea>
                    <button onClick={createComment}>Post</button>

                    <hr></hr>
                </div>
        }
            
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

            {permCreateComment}

            {/*print out the comments array*/}
            <div class="comments">
                
                {commentList}
            </div> 
        </body>
      </Container>
    </Layout>
  );
}
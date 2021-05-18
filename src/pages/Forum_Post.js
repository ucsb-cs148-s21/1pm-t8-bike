import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import axios from 'axios';
import React, { useState, Component } from "react";
import { threads } from "./data";
import {  withRouter } from "react-router";
import PageNotFound from "./PageNotFound";
import { Category, TransferWithinAStationSharp } from "@material-ui/icons";

//const textStyle = {maxWidth: "100%", width: "700px"}

//post format to view component
const Post = props => (
    <div class="header-root-post">
            <h4 class="title">
                {props.post.title}
            </h4>  
            <div class="root-description">
                {props.post.description}
            </div>
            <div class="bottom">
                <p class="info-line">
                <span class="author">{props.post.username}</span> - <span class="date">{(props.post.date).toString().substring(0,10)}</span> - <span class="comment-count">{props.post.numComments} comments</span>
                </p>
            </div>
        </div> 
)

//comment component that will list out
const Comment = props => (
    <li class="row">
        <div class="comment">
        <div class="comment-header">
        <p class="comment-header">
            {console.log("inside the comp Comment")}
            <span class="user">{props.comment.username}</span> - {" "}
            <small class="date">
            {" "}
            {props.comment.date}
            </small>
        </p>
        </div>
        <div class="comment-content">{props.comment.description}</div>
        <hr></hr>
    </div>
  </li>
)

//component to view post + comments + addcomments
class ForumPost extends Component{
    //constructor
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        //this.componentCommentDidMount = this.componentDidMount.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.viewPost = this.viewPost.bind(this);
        this.commentList = this.commentList.bind(this);
        this.permCreateComment = this.permCreateComment.bind(this);

        this.postID = this.props.match.params.id;

        this.state = { post: {username: '',
        category: '',
        title: '',
        description: '',
        numComments: 0,
        comments: [],
        date: new Date(),} ,comments: [], user: getUser(), username: '',description: '', date: new Date(),};
        //comments array to hold all comments in post
        //has the info to input a new comment
    }

    //function grab the post we are looking at, renders after return
    componentDidMount(){
        console.log(this.postID);
        axios.get(`http://localhost:3001/posts/${this.postID}`)
             .then(res=>{
                 this.setState({post: res.data})
             })
             .catch(err => {
                 console.log(err);
             })
        axios.get(`http://localhost:3001/posts/${this.postID}/get-comments`)
             .then(res=>{
                 this.setState({comments: res.data})
                 console.log("this is comments: " + JSON.stringify(res.data))
             })
             .catch(err => {
                 console.log(err);
             })
    }// end componentDidMount

    //return the post in format
    viewPost(){
            console.log(JSON.stringify(this.state.post,null,2));
            return <Post post = {this.state.post}/>
    }// end viewPost

    //returns every comment in comment format
    commentList(){
        console.log("print comment list");
        return this.state.comments.map(currComment => {
            return <Comment comment = {currComment}
                            key = {currComment._id}
                    />
        })
    }// end commentList

    //onSubmit for comment
    onSubmit(e){
        e.preventDefault();

        const comment = {
            username: this.state.username,
            description: this.state.description,
            date: this.state.date,
        }

        console.log(comment);

        //add to db
        axios.post(`http://localhost:3001/posts/update/${this.postID}/add-comment`,comment)
             .then(res => console.log(res.data));
             //.then(this.componentCommentDidMount());

        window.location.reload(); 
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }
    onChangeDate(date){
        this.setState({
          date: date //e.target.value == textbox 
        });
    }

    permCreateComment(){
        if(this.state.user){
            console.log("user should be able to add a comment");
            return(
                <div class="createCommentBtn">
                    <form onSubmit={this.onSubmit}>
                        {/*write a username (TEMP) */}
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                   required 
                                   className="form-control"
                                   value={this.state.username}
                                   onChange={this.onChangeUsername}
                            />
                        </div>

                        {/* Write your comment */}
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                required  
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-group">
                            <input type="submit"
                                value="Create New Comment"
                                className="btn btn-primary"
                            />
                        </div>
                    </form>
                </div>
            );
        }
        else{
            console.log("user should NOT be able to add a comment");
            return(
                <div class="createCommentBtn"/>
            );
        }
    }// end permCreateComment

    render(){
        return(
            <Layout user={this.state.user}>
                <Container>
                    <h1>Bike Forum</h1>

                    <br></br>

                    <body>
                    <div class="root">{this.viewPost()}</div>

                    <hr></hr>

                    {this.permCreateComment()}
                    <hr></hr>

                    {/*print out the comments array*/}
                    <ol class="comments">{this.commentList()}</ol>
                    </body>

                </Container>
            </Layout>
        )
    }
}// end ForumPost

export default withRouter(ForumPost);
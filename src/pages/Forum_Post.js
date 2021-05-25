import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import axios from 'axios';
import React, { Component } from "react";
import {  withRouter } from "react-router";
//import PageNotFound from "./PageNotFound";
//import { Category, RemoveShoppingCartSharp, TransferWithinAStation, TransferWithinAStationSharp } from "@material-ui/icons";

//const textStyle = {maxWidth: "100%", width: "700px"}

//post format to view component
const Post = props => (
    <div class="header-root-post">
            <h4 class="title">
                {props.post.title}
            </h4>  
            <div class="info-line">
                <p class="info-line">
                <span class="author">{props.post.username}</span> - <span class="date">{(props.post.date).toString().substring(0,10)}</span> - <span class="comment-count">{props.post.numComments} comments</span>
                </p>
            </div>
            <div class="root-description">
                {props.post.description}
            </div>
            <div className="pic">
                <img src={`/uploads/${props.post.img}`} alt={`${props.post.img}`} style={{width: "50%", height: "auto"}}/>
            </div>
            
        </div> 
)

//comment component that will list out
const Comment = props => (
    <li class="row">
        <div className="comment">
            <div className="comment-header">
                <p className="comment-header" style={{fontSize: "16px"}}>
                    {console.log("making a Comment obj")}
                    <span className="user">{props.comment.username}</span> - {" "}
                    <small className="date">
                    {" "}
                    {props.comment.date}
                    </small>
                </p>
            </div>
            <div className="comment-content">
                <p className="comment-context" style={{fontSize: "16px"}}>
                    {props.comment.description}
                </p>
            </div>
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
        this.onSubmit = this.onSubmit.bind(this);
        this.viewPost = this.viewPost.bind(this);
        this.commentList = this.commentList.bind(this);
        this.permCreateComment = this.permCreateComment.bind(this);
        this.onChangeU = this.onChangeU.bind(this);
        this.onChangeD = this.onChangeD.bind(this);

        this.postID = this.props.match.params.id;
        this.postUpdated = "";

        // placeholder vars for creating a new comment
        this.commentUser = "";
        this.commentDesc = "";
        this.commentDate = new Date();
    
        this.state = { 
            post: {username: '',category: '',title: '',description: '',img: '', numComments: 0,comments: [],date: new Date(),},
            comments: [], 
            user: getUser(), 
        }
    }// end constructor

    //function grab the post we are looking at, renders after return
    componentDidMount(){
        console.log("componentDidMount");
        console.log(this.postID);
        axios.get(`http://localhost:3001/posts/${this.postID}`)
             .then(res=>{
                 console.log("compDidMount: get post from db");
                 this.setState({post: res.data})
             })
             .catch(err => {
                 console.log(err);
             })
        axios.get(`http://localhost:3001/posts/${this.postID}/get-comments`)
             .then(res=>{
                 console.log("compDidMount: get comments from db");
                 this.setState({comments: res.data})
                 //console.log("this is comments: " + JSON.stringify(res.data))
             })
             .catch(err => {
                 console.log(err);
             })

    }// end componentDidMount

    //returns every comment in comment format
    commentList(){
        console.log("print comment list");
        return this.state.comments.map(currComment => {
            return <Comment comment = {currComment}
                            key = {currComment._id}
                    />
        })
    }// end commentList

    //return the post in format
    viewPost(){
            //console.log("viewPost(): " + JSON.stringify(this.state.post,null,2));
            return <Post post = {this.state.post}/>
    }// end viewPost

    //onSubmit for comment
    onSubmit(e){
        e.preventDefault();

        //template comment 
        const comment = {
            username: this.commentUser,
            description: this.commentDesc,
            date: this.commentDate,
        }

        //console.log(comment);

        //add to db
        axios.post(`http://localhost:3001/posts/update/${this.postID}/add-comment`,comment)
            .then(res => {
                 console.log("onSubmit: " + res.data)
                 console.log("after adding new comment to db");

                 //update this.state.comments with new comments
                 axios.get(`http://localhost:3001/posts/${this.postID}/get-comments`)
                    .then(res=>{
                        console.log("onSubmit: get comments from db")
                        this.setState({comments: res.data})
                        //console.log("this is comments: " + JSON.stringify(res.data))
                    })
                .catch(err => {
                    console.log(err);
                })
                
                //update post
                axios.get(`http://localhost:3001/posts/${this.postID}`)
                    .then(res=>{
                        console.log("compDidMount: get post from db");
                        this.setState({post: res.data})
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })

        //should clear submissions
        e.target.reset();
    }

    onChangeU(e){
        this.commentUser = e.target.value;
    }
    onChangeD(e){
        this.commentDesc = e.target.value;
    }

    permCreateComment(){
        if(this.state.user){
            //console.log("user should be able to add a comment");
            return(
                <div class="createCommentBtn">
                    <form name="createCom" onSubmit={this.onSubmit}>
                        {/*write a username (TEMP) */}
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                   required 
                                   className="form-control"
                                   name="commentUser"
                                   //value=""
                                   onChange={this.onChangeU}
                            />
                        </div>

                        {/* Write your comment */}
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                required  
                                className="form-control"
                                name="commentDesc"
                                //value="description"
                                onChange={this.onChangeD}
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
            //console.log("user should NOT be able to add a comment");
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
                    {this.postUpdated}
                    {/*print out the comments array*/}
                    <ol class="comments">{this.commentList()}</ol>
                    </body>

                </Container>
            </Layout>
        )
    }
}// end ForumPost

export default withRouter(ForumPost);

/*
Notes:

-whenever you setState, it will autorun componentDidUpdate
-onChange inside <input> forms will be called everytime the input text changes, that means that onChange will be called everytime something changes irt
*/
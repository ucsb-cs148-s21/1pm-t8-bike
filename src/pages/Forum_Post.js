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
    <div className="header-root-post">
            <h3 className="title">
                {props.post.title}  
            </h3>  
            <h6 className="tags">
                {props.post.category}{ props.post.status == 'CLOSED' && ' - ' + props.post.status}
            </h6>
            <div className="info-line">
                <p className="info-line">
                <span className="author">{props.post.username}</span> - <span className="date">{(props.post.date).toString().substring(0,10)}</span> - <span className="comment-count">{props.post.numComments} comments</span> <input type="button" value="Delete Post" style={{float: "right"}} onClick={() => {props.deletePost()}}/> <input type="button" value="Edit Post" style={{float: "right"}} onClick={() => {props.editPost()}}/> <input type="button" value="Change Status" style={{float: "right"}} onClick={() => {props.changeStatus()}}/>
                </p>
            </div>
            <hr></hr>
            <div className="root-description">
                {props.post.description}
            </div>
            <div className="pic">
                <img src={`/uploads/${props.post.img}`} alt={`${props.post.img}`} style={{width: "25%", height: "auto"}}/>
            </div>
            
        </div> 
)

//comment component that will list out
const Comment = props => (
    <li className="row">
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
            <div className="buttons">
                <p className="buttons">
                    <input type="button" value="Delete" style={{float: "center"}} onClick={() => {props.deleteComment()}}/> <input type="button" value="Edit" style={{float: "center"}} onClick={() => {props.editComment()}}/>
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
        this.onChangeEditU = this.onChangeEditU.bind(this);
        this.onChangeEditD = this.onChangeEditD.bind(this);

        //this is for del/edit/change status
        //permissions will be added later
        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.editComment = this.editComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);

        this.postID = this.props.match.params.id;
        this.postUpdated = "";

        // placeholder vars for creating a new comment
        this.commentUser = "";
        this.commentDesc = "";
        this.commentDate = new Date();

        //placeholder vars for updating an exisiting comment
        this.commentEditUser = "";
        this.commentEditDesc = "";
        this.commentEditDate = new Date();
    
        this.state = { 
            post: {username: '',category: '',title: '',description: '',img: '', status: '', numComments: 0,comments: [],date: new Date(),},
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
        console.log(`img: ${this.state.post.img}`);

    }// end componentDidMount

    //returns every comment in comment format
    commentList(){
        console.log("print comment list");
        return this.state.comments.map(currComment => {
            return <Comment comment = {currComment}
                            key = {currComment._id}
                            deleteComment = {() => this.deleteComment(this.postID,currComment._id)}
                            editComment = {() => this.editComment(this.postID,currComment._id)}
                    />
        })
    }// end commentList

    //return the post in format
    viewPost(){
            //console.log("viewPost(): " + JSON.stringify(this.state.post,null,2));
            return <Post post = {this.state.post} deletePost={this.deletePost} editPost={this.editPost} changeStatus={this.changeStatus} />
             
    }// end viewPost

    /*
    delete post will delete the item from db and redirect to forums main page with msg that
    says 'Post deleted!'
    */
    deletePost(){
        axios.delete(`http://localhost:3001/posts/${this.postID}`)
             .then(res => {
                 console.log(res.data)
             })
             .catch(err =>{
                 console.log('Error: ' + err);
             })
        
        console.log("delPost");
        window.location = '/forum';
    }

    /* edit the post: redirect to createPost page with every info in to resumbit,, after
    submit goes back to post page, NOT the main page */
    editPost(){
        //go to edit post page
        console.log("editPost");
        window.location = `/forum/edit-post/${this.postID}`;
    }

    //delete comment
    deleteComment(id,cId){
        axios.delete(`http://localhost:3001/posts/${id}/delete-comment/${cId}`)
            .then(res => {
                console.log(res.data)
                //refresh comments
                 axios.get(`http://localhost:3001/posts/${id}/get-comments`)
                       .then(res=>{
                            console.log("compDidMount: get comments from db");
                            this.setState({comments: res.data})
                            //console.log("this is comments: " + JSON.stringify(res.data))
                        })
                       .catch(err => {
                            console.log(err);
                        })
            })
            .catch(err => {
                console.log('Error: ' + err);
            })
    }

    editComment(id, cId){
        //set the commentEditUser and commentEditDescription

        <form name="editCom" onSubmit={() => this.onSubmitEdit(id,cId)}>
            {/*write a username (TEMP) */}
            <div className="form-group">
                <label>Username: </label>
                <input type="text"
                        required 
                        className="form-control"
                        name="commentEditUser"
                        //value=""
                        onChange={this.onChangeEditU}
                />
            </div>

            {/* Write your comment */}
            <div className="form-group">
                <label>Description: </label>
                <input type="text"
                    required  
                    className="form-control"
                    name="commentEditDesc"
                    //value="description"
                    onChange={this.onChangeEditD}
                />
            </div>

            {/* Submit Button */}
            <div className="form-group">
                <input type="submit"
                    value="Update Comment"
                    className="btn btn-primary"
                />
            </div>
        </form>
    }

    onSubmitEdit(e, id, cId){
        e.preventDefault();

        //template comment to be submitted
        const comment = {
            username: this.commentEditUser,
            description: this.commentEditDesc,
            date: this.commentEditDate,
        }
        //console.log(comment);

        //add to db
        axios.post(`http://localhost:3001/posts/update/${id}/update-comment/${cId}`,comment)
            .then(res => {
                 console.log("onSubmit: " + res.data)
                 console.log("after updating new comment to db");

                 //update this.state.comments with new comments
                 axios.get(`http://localhost:3001/posts/${id}/get-comments`)
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

    /* change the status, if open -> closed, closed -> open */
    changeStatus(){
        //when clicked will check state status, if closed=>open, open=>closed
        //do an update in db and get post again
        const updatedStatus = new FormData();
        updatedStatus.append("username", this.state.post.username);
        updatedStatus.append("category", this.state.post.category);
        updatedStatus.append("title", this.state.post.title);
        updatedStatus.append("description", this.state.post.description);
        updatedStatus.append("date", this.state.post.date);
        updatedStatus.append("img", this.state.post.img);
        updatedStatus.append("numComments", this.state.post.numComments);
        updatedStatus.append("comments", this.state.post.comments);

        if(this.state.post.status === "CLOSED"){          
            updatedStatus.append("status", "OPEN");        
        }
        else if(this.state.post.status === "OPEN"){          
            updatedStatus.append("status", "CLOSED");        
        }
        else{
            updatedStatus.append("status","");
        }

        // update post in db
        axios.post(`http://localhost:3001/posts/update/${this.postID}`,updatedStatus)
            .then(res => {
                console.log(res.data); 
                //re get the post info and update, no need to update comments as its the same
                axios.get(`http://localhost:3001/posts/${this.postID}`)
                .then(res=>{
                    console.log("compDidMount: get post from db");
                    this.setState({post: res.data})
                })
                .catch(err => {
                    console.log(err);
                })
            })
    
    }

    //onSubmit for comment
    onSubmit(e){
        e.preventDefault();

        //template comment to be submitted
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
    onChangeEditU(e){
        this.commentEditUser = e.target.value;
    }
    onChangeEditD(e){
        this.commentEditDesc = e.target.value;
    }

    permCreateComment(){
        if(this.state.user){
            //console.log("user should be able to add a comment");
            return(
                <div className="createCommentBtn">
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
                <div className="createCommentBtn"/>
            );
        }
    }// end permCreateComment

    render(){
        return(
            <Layout user={this.state.user}>
                <Container>
                    <h1><a href="/forum"style={{"textDecoration": "none", "color":"inherit"}}>Bike Forum</a></h1>

                    <br></br>

                    <div>
                        <div className="root">{this.viewPost()}</div>

                        <hr></hr>

                        {this.permCreateComment()}
                        <hr></hr>
                        {/*print out the comments array*/}
                        <ol className="comments">{this.commentList()}</ol>
                    </div>

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
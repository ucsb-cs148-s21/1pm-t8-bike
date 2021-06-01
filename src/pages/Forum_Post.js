import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import axios from 'axios';
import React, { Component, useState } from "react";
import {  withRouter } from "react-router";
//import PageNotFound from "./PageNotFound";
//import { Category, RemoveShoppingCartSharp, TransferWithinAStation, TransferWithinAStationSharp } from "@material-ui/icons";

//styles
const styles = {
    commentStyle: {
        borderBottomStyle: 'ridge',
        width: '100%',
        marginTop: "5px",
        marginBottom: "5px",
        textAlign: 'left',
        padding: '5px',
        overflowWrap: 'break-word',
        position: 'relative',
    },
    commentHeader: {
        borderBottomStyle: 'ridge',
        fontSize: '16px',
        overflowWrap: 'break-word',
        width: 'fit-content',
    },
    commentEditDStyle: {
        resize: 'vertical',
        width: '80vw',
        height: 'auto',
        overflowWrap: 'break-word',
        position: 'relative',
       
    },
    delEditButtons:{
        fontSize: '13px',
        float: 'left',
    },
    postStyle: {
        overflowWrap: 'break-word'
    },
    categoryStyle: {
        borderRadius: '20px',
        padding: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        fontSize: '12px',
        textDecoration: 'none',
        background: 'blue',
        color: "white",
    },
      statusStyle: {
        borderRadius: '20px',
        padding: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        fontSize: '12px',
        textDecoration: 'none',
        background: 'red',
        color: "white",
    },
  }

//post format to view component
const Post = props => (
    <div className="header-root-post" style={styles.postStyle}>
            <h3 className="title">
                {props.post.title}  
            </h3>  
            <h6 className="tags">
                <span style={styles.categoryStyle}>{props.post.category}</span> { props.post.status === 'CLOSED' &&  <span style={styles.statusStyle}>{props.post.status}</span>}
            </h6>
            <div className="info-line" >
                <p className="info-line">
                    <span className="author">{props.post.username}</span> - <span className="date">{(props.post.date).toString().substring(0,10)}</span> - <span className="comment-count">{props.post.numComments} comments</span> {props.user && <span style={{float: 'right'}}><input type="button" value="Change Status" disabled={props.isChangingStatus} onClick={() => {props.changeStatus()}}/>  <input type="button" value="Edit" onClick={() => {props.editPost()}}/>  <input type="button" value="Delete" onClick={() => {props.deletePost()}}/></span>}
                </p>
            </div>
            <hr></hr>
            <div className="root-description" style={{ "whiteSpace": "pre-wrap"}}>
                {props.post.description}            
            </div>
            <div className="pic">
                {props.post.img!=='' && <br/>}         
                {props.post.img!=='' && <img src={`${props.post.img}`} alt={`${props.post.img}`} style={{width: "25%", height: "auto"}}/>}         
            </div>
            
        </div> 
)

//comment component that will list out
const ViewComment = props => (
    <li className="row">
        <div className="comment" style={styles.commentStyle}>
            <div className="comment-header">
                <p className="comment-header" style={styles.commentHeader}>
                    {console.log("making a Comment obj")}
                    <span className="user">{props.comment.username}</span> - {" "}
                    <small className="date">
                    {" "}
                    {props.comment.date.substring(0,10)}
                    </small>
                </p>
            </div>
            <div className="comment-content" style={{ "whiteSpace": "pre-wrap"}}>
                <p className="comment-context" style={{fontSize: "16px", position: 'relative',}}>
                    {props.comment.description}
                </p>
            </div>
            <div className="buttons">
                <p className="buttons" style={styles.delEditButtons}>
                    <input type="button" value="Edit" onClick={() => {props.editComment()}}/> <input type="button" value="Delete" onClick={() => {props.deleteComment()}}/>
                </p>
            </div>
        </div>
    </li>
)

//comment component that will create edit comp
const EditComment = props => {
    //setting state var
    const [description, setDescription] = useState(props.comment.description);
    
    //setting on change
    function onChangeD(e){
        setDescription(e.target.value);
    }
    function onSubmitEditComment(e){   
        e.preventDefault();

        //template comment to be submitted
        const comment = {
            username: props.comment.username,
            description: description.trim(),
            date: new Date(),
        }
        //console.log(comment);

        //update to db
        axios.post(`/posts/update/${props.postID}/update-comment/${props.commentID}`,comment)
            .then(res => {               
                 props.afterOnSubmitEditComment();
            })

        //should go back to normal submissions

    }

    //setting onSubmit
    return(
                
        <li className="row" style={styles.commentStyle}>
            
            <div className="createCommentBtn">
                <form name="editCom" onSubmit={onSubmitEditComment}>      
                    <p className="comment-header" style={styles.commentHeader}>
                        <span className="user">{props.comment.username}</span> - {" "}
                        <small className="date">
                        {" "}
                        {props.comment.date.substring(0,10)}
                        </small>
                    </p>        

                    {/* Write your comment */}
                    <div className="form-group">
                        <textarea
                            required  
                            placeholder="Add a comment"
                            className="form-control"
                            style={styles.commentEditDStyle}
                            name="commentDesc"
                            value={description}
                            onChange={onChangeD}
                        />
                    </div>

                    {/* Submit/Cancel Button */}
                    <div className="form-group">
                        <p>
                            <input type="submit" value="Update" className="btn btn-primary"/>  <input type="button" value="Cancel"className="btn btn-primary"onClick={()=>{props.cancelComment()}}/>
                        </p>
                    </div>
                </form>
            </div>
        </li>
    );
}

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
    
        this.state = { 
            post: {username: '',category: '',title: '',description: '',img: '', status: '', numComments: 0,comments: [],date: 0},
            comments: [], 
            isEditComment: false,
            editCommentId: 0,
            user: getUser(), 
            isChangingStatus: false,
        }
    }// end constructor

    //function grab the post we are looking at, renders after return
    componentDidMount(){
        console.log("componentDidMount");
        console.log(this.postID);
        axios.get(`/posts/${this.postID}`)
             .then(res=>{
                 console.log("compDidMount: get post from db");
                 this.setState({post: res.data},()=>{
                     if(this.state.post.category === ''){
                        window.location.href = '/PageNotFound';
                     }
                 })
             })
             .catch(err => {
                 console.log(err);
             })
        axios.get(`/posts/${this.postID}/get-comments`)
             .then(res=>{
                 console.log("compDidMount: get comments from db");
                 this.setState({comments: res.data})
                 //console.log("this is comments: " + JSON.stringify(res.data))
             })
             .catch(err => {
                 console.log(err);
             })
        //console.log(`img: ${this.state.post.img}`);

    }// end componentDidMount

    //returns every comment in comment format
    commentList(){
        if(this.state.isEditComment === false){
            console.log("commentList: isEditComment = false");
            return this.state.comments.map(currComment => {
                return <ViewComment 
                            comment = {currComment}
                            key = {currComment._id}
                            deleteComment = {() => this.deleteComment(this.postID,currComment._id)}
                            editComment = {() => this.editComment(currComment._id)}
                        />
            })
        }
        else if(this.state.isEditComment === true){
            return this.state.comments.map(currComment => {
                //console.log("commentList: isEditComment = true");
                console.log("editCommentId: " + this.state.editCommentId);
        
                if(currComment._id === this.state.editCommentId){
                    console.log("edit comment: "+ currComment._id);
                    return <EditComment 
                            comment = {currComment}
                            postID = {this.postID}
                            commentID = {currComment._id}
                            key = {currComment._id}
                            afterOnSubmitEditComment = {() => this.afterOnSubmitEditComment()}
                            cancelComment = {() => this.setState({isEditComment:false, editCommentId: 0})}
                        />
                }
                else{
                    console.log("view comment: " + currComment._id);
                    return <ViewComment 
                                comment = {currComment}
                                key = {currComment._id}
                                deleteComment = {() => this.deleteComment(this.postID,currComment._id)}
                                editComment = {() => this.editComment(currComment._id)}
                        />
                }
            })
        }
        
    }// end commentList

    //return the post in format
    viewPost(){
            //console.log("viewPost(): " + JSON.stringify(this.state.post,null,2));
            return <Post key={this.state.post._id} 
                        post = {this.state.post} 
                        isChangingStatus = {this.state.isChangingStatus}
                        user = {this.state.user}
                        deletePost={this.deletePost} 
                        editPost={this.editPost} 
                        changeStatus={this.changeStatus} 
                    />
             
    }// end viewPost

    /*
    delete post will delete the item from db and redirect to forums main page with msg that
    says 'Post deleted!'
    */
    deletePost(){
        if (window.confirm("Are you sure you want to delete this post?")) {
            axios.delete(`/posts/${this.postID}`)
                .then(res => {
                    console.log(res.data)
                    console.log("delPost");
                    window.alert("Post Deleted!");
                    window.location = '/forum';
                })
                .catch(err =>{
                    console.log('Error: ' + err);
                })
            
            
        }
        
       
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
        if (this.state.isEditComment === false ) {
            if(window.confirm("Are you sure you want to delete this comment?")){
                axios.delete(`/posts/${id}/delete-comment/${cId}`)
                    .then(res => {
                        console.log(res.data)
                        //refresh comments
                        axios.get(`/posts/${id}/get-comments`)
                            .then(res=>{
                                //console.log("compDidMount: get comments from db");
                                this.setState({comments: res.data})
                                //console.log("this is comments: " + JSON.stringify(res.data))
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        //refresh post
                        axios.get(`/posts/${id}`)
                        .then(res=>{
                            //console.log("compDidMount: get comments from db");
                            this.setState({post: res.data})
                            //console.log("this is comments: " + JSON.stringify(res.data))
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    })
                    .catch(err => {
                        console.log('Error: ' + err);
                    })
                window.alert("Comment Deleted!");
            }   
        }
        else if(this.state.isEditComment === true){
            this.setState({isEditComment: false},()=>{
                this.deleteComment(id,cId);
            });
            
        }
    }

    editComment(cId){
        //check if 'isEditComment' is false
        //if false, set true, cont
        //if true, then convert everything back to viewComments, then cont
        if(this.state.isEditComment === false){
            //set true, then do
            this.setState({isEditComment: true, editCommentId: cId});
        }
        else if(this.state.isEditComment === true){
            //first reverts comment back to normal, then reset editComment
            this.setState({editCommentId: cId});
        }

        
    }

    afterOnSubmitEditComment(){
        //update this.state.comments with new comments
        axios.get(`/posts/${this.postID}/get-comments`)
            .then(res=>{
                console.log("onSubmit: get comments from db")
                this.setState({comments: res.data, isEditComment: false, editCommentId:0})
                //console.log("this is comments: " + JSON.stringify(res.data))
            })
            .catch(err => {
                console.log(err);
            })
        
        //update post
        axios.get(`/posts/${this.postID}`)
            .then(res=>{
                console.log("compDidMount: get post from db");
                this.setState({post: res.data})
                window.alert("Comment Updated!");
            })
            .catch(err => {
                console.log(err);
            })
        
    }

    /* change the status, if open -> closed, closed -> open */
    changeStatus(){
        //when clicked will check state status, if closed=>open, open=>closed
        //do an update in db and get post again
        this.setState({isChangingStatus: true});
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
        axios.post(`/posts/update/${this.postID}`,updatedStatus)
            .then(res => {
                console.log(res.data); 
                //re get the post info and update, no need to update comments as its the same
                axios.get(`/posts/${this.postID}`)
                .then(res=>{
                    console.log("compDidMount: get post from db");
                    this.setState({post: res.data, isChangingStatus: false})
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
            username: this.state.user.email,
            description: this.commentDesc,
            date: this.commentDate,
        }

        //console.log(comment);

        //add to db
        axios.post(`/posts/update/${this.postID}/add-comment`,comment)
            .then(res => {
                 console.log("onSubmit: " + res.data)
                 console.log("after adding new comment to db");

                 //update this.state.comments with new comments
                 axios.get(`/posts/${this.postID}/get-comments`)
                    .then(res=>{
                        console.log("onSubmit: get comments from db")
                        this.setState({comments: res.data})
                        //console.log("this is comments: " + JSON.stringify(res.data))
                    })
                .catch(err => {
                    console.log(err);
                })
                
                //update post
                axios.get(`/posts/${this.postID}`)
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

                        {/* Write your comment */}
                        <div className="form-group">
                            <textarea
                                required  
                                className="form-control"
                                placeholder="Add a Comment"
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
                    <hr/>
                    <br></br>

                    <div>
                        <div className="root">{this.viewPost()}</div>

                        <hr></hr>
                        {this.permCreateComment()}
                        <hr></hr>
                            <h3 style={{borderBottomStyle: 'solid',width: 'fit-content'}}>Comments ({this.state.post.numComments})</h3>
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
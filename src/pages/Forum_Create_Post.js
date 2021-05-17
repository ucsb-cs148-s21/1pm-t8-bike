import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import axios from 'axios';
import {threads} from "./data";
import React, {Component} from 'react';

//const textStyle = {maxWidth: "100%", width: "700px"}

// when you create a post in general
// export default function ForumCreatePost() {
//   const user = getUser();

//   function onSubmit() {
//     if (
//       document.getElementById("newTitle").value !== "" &&
//       document.getElementById("categories").value !== "----"
//     ) {
//       var newPost = {
//         id: threads.length + 1,
//         title: document.getElementById("newTitle").value,
//         category: document.getElementById("categories").value,
//         author: "Placeholder",
//         date: Date.now(),
//         content: document.getElementById("newDescription").value,
//         comments: [], //no comments
//       };
//       threads.push(newPost);
//       console.log(threads);
//       //clear all inputs
//       document.getElementById("newTitle").value = "";
//       document.getElementById("categories").value = "----";
//       document.getElementById("newDescription").value = "";

//       //go back to forum main page
//       window.location.href = "/forum";
//       console.log("return forum...");
//     }
//   }

//   return (
//     <Layout user={user}>
//       <Container>
//         <h1>
//           {" "}
//           {/*title*/}
//           Bike Forum
//         </h1>
//         <br></br>
//         <body>
//           <textarea id="newTitle" placeholder="New Title"></textarea>
//           <br></br>
//           <select name="categories" id="categories">
//             <option value="----">----</option>
//             <option value="Announcements">Announcements</option>
//             <option value="Lost and Found">Lost and Found</option>
//             <option value="Crash Reports">Crash Reports</option>
//             <option value="Others">Others</option>
//           </select>
//           <br></br>
//           <textarea
//             id="newDescription"
//             placeholder="Your Description"
//           ></textarea>
//           <br></br>
//           <button onClick={onSubmit}>Post it!</button>
//         </body>
//       </Container>
//     </Layout>
//   );
// }

export default class ForumCreatePost extends Component{
  
  constructor(props){
    super(props);

    // link Component 'this' to the function 'this'
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    //this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    
    // set 'this' with default values
    this.state = {
      //all the properties in db post, default values
      username: '',
      category: '',
      title: '',
      description: '',
      numComments: 0,
      comments: [],
      date: new Date(),
      user: getUser(),

    }// end this.state

  } // end constructor

  // setters for properties
  onChangeUsername(e){
    this.setState({
      username: e.target.value //e.target.value == textbox 
    });
  }
  onChangeCategory(e){
    this.setState({
      category: e.target.value //e.target.value == textbox 
    });
  }
  onChangeTitle(e){
    this.setState({
      title: e.target.value //e.target.value == textbox 
    });
  }
  onChangeDescription(e){
    this.setState({
      description: e.target.value //e.target.value == textbox 
    });
  }
  
  //new posts will always have zero comments and items in array

  // onChangeDate(date){
  //   this.setState({
  //     date: date //e.target.value == textbox 
  //   });
  // }

  // onSubmit button to create post
  onSubmit(e){
    e.preventDefault(); // does not set post as default, instead set as below

    const post = {
      username: this.state.username,
      category: this.state.category,
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      numComments: this.state.numComments,
      comments: this.state.comments
    }

    //prints out what is going to be posted
    console.log(post);

    //add to db
    axios.post('http://localhost:3001/posts/add/',post)
         .then(res => console.log(res.data));

    // redirect back to the forums page
    window.location = '/forum';
  } // end onSubmit

  // componentDidMount(){
  //   this.setState({
  //     username: 'test user',
  //     title: 'test title',
  //     description: 'test description',
      
  //   })
  // }

  render(){
    return(
      <Layout user={this.state.user}>
        <Container>
          <h1>
            {" "}
            {/*title*/}
            Bike Forum
          </h1>
          <br></br>
          
          <div>
            <form onSubmit={this.onSubmit}>

              {/*write a username */}
              <div className="form-group">
                <label>Username: </label>
                <input type="text"
                      required  
                      className="form-control"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                />
              </div>

              {/* choose a category from dropdown */}
              <div className="form-group">
                <label>Category: </label>
                <select ref="categoryInput" 
                        required className="form-control" 
                        value={this.state.category} 
                        onChange={this.onChangeCategory}
                >
                  <option value=""> -- Choose One -- </option>
                  <option>Announcement</option>
                  <option>Lost and Found</option>
                  <option>Crash Report</option>
                  <option>Other</option>

                </select>
              </div>

              {/* write title */}
              <div className="form-group">
                <label>Title: </label>
                <input type="text"
                      required  
                      className="form-control"
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                />
              </div>

              {/* write description */}
              <div className="form-group">
                <label>Description: </label>
                <input type="text"
                      required  
                      className="form-control"
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                />
              </div>

              {/* Date should automatically be set as current date */}

              {/* Submit Button */}
              <div className="form-group">
                <input type="submit"
                      value="Create New Post"
                      className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </Container>
      </Layout>
    );
  }
};
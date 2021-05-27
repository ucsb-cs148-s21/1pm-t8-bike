import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import axios from 'axios';
import React, {Component} from 'react';


//const textStyle = {maxWidth: "100%", width: "700px"}

export default class ForumCreatePost extends Component{
  
  constructor(props){
    super(props);

    // link Component 'this' to the function 'this'
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    
    // set 'this' with default values
    this.state = {
      //all the properties in db post, default values
      username: '',
      category: '',
      title: '',
      description: '',
      img: '',
      status: 'OPEN',
      numComments: 0,
      comments: [],
      date: new Date(),
      user: getUser(),
      currFile: null,

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
  onChangeImg(e){
    console.log("createpost: " + e.target.files);
    this.setState({
      img: e.target.files[0], //e.target.value == textbox 
      currFile:  URL.createObjectURL( e.target.files[0]),     
    });
  }
  
  //new posts will always have zero comments and items in array

  onChangeDate(date){
    this.setState({
      date: date //e.target.value == textbox 
    });
  }

  // onSubmit button to create post
  onSubmit(e){
    e.preventDefault(); // does not set post as default, instead set as below
    
    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("category", this.state.category);
    formData.append("title", this.state.title);
    formData.append("description", this.state.description.trim());
    formData.append("date", this.state.date);
    formData.append("img", this.state.img);
    formData.append("status", this.state.status);
    formData.append("numComments", this.state.numComments);
    formData.append("comments", this.state.comments);
    
    //prints out what is going to be posted
    //console.log(post);

    //add to db
    axios.post('http://localhost:3001/posts/add/',formData)
         .then(res => {
           console.log(res.data);
           window.location = '/forum';
            window.alert("Post Added!");
         });

    // redirect back to the forums page
    
    
  } // end onSubmit

  render(){
    return(
      <Layout user={this.state.user}>
        <Container>
          <h1><a href="/forum" style={{"textDecoration": "none", "color":"inherit"}}>Bike Forum</a></h1>
          <hr/>
          <br></br>
          
          <div>
            <form onSubmit={this.onSubmit} encType="multipart/form-data">

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

              {/* write description */}
              <div className="form-group">
                <label>Description: </label>
                <textarea
                      required  
                      wrap = 'hard'
                      rows = '10'
                      className="form-control"
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                />
              </div>

              {/* upload image */}
              <div className="form-group">
                {/* checks if img = updated, if not update */}
                <p>Current Image: <img src={this.state.currFile} alt={`${this.state.img}`} style={{width: "10%", height: "auto"}}/></p>              
                <br/>
                <label htmlFor="file">Change Image: </label>
                <input type="file"  
                       filename="img"
                       className="form-control-file"
                       accept="image/jpg, image/jpeg, image/png"
                       style = {{color: "rgba(0, 0, 0, 0)"}}
                       onChange={this.onChangeImg}
                />
                <input type="button" value="Delete Image" onClick={() => this.setState({img: '', currFile: null})}  />
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
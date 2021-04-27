import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";

const textStyle = {maxWidth: "100%", width: "700px"}

// this is when you click on a post
export default function ForumPost() {
  const user = getUser();

  return (
    <Layout user={user}>
      <Container>
        <h1> 
            Bike Forum
        </h1>
        <br></br>
        

         <body>
            <div class="header-root-post">
                <h4 class="title">
                    Thread 1
                </h4>  
                <div class="root-content">
                    This is stuff inside of the post and has a lot of words for no reason.
                </div>
                <div class="bottom">
                    <p class="info-line">
                        <span class="author">Author</span> - <span class="date">04/26/2021</span> - <span class="comment-count">5 comments</span>
                    </p>
                </div>
            </div> 

            <hr></hr>

            <textarea>Add a comment</textarea>
            <button>Post</button>

            <hr></hr>
            <div class="comments">
                <div class="comment">
                    <div class="comment-header">
                        <p class="comment-header">
                            <span class="user">User</span> - <small class="date">04/26/2021</small>
                        </p>
                    </div>
                    <div class="comment-content">
                        Comment text here
                    </div>
                    <hr></hr>
                </div>
            </div> 
        </body>
      </Container>
    </Layout>
  );
}
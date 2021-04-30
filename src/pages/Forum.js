import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import { threads } from "./data";

//const textStyle = {maxWidth: "100%", width: "700px"}

// this is the main page of forum, see list of posts
export default function Forum() {
  const user = getUser();
  //<script src="data.js"></script>

  console.log(threads);
  var container = [];
  for (let i = 0; i < threads.length; i++) {
    var html = 
      <li class="row">
        <a href={`/forum/${threads[i].id}`}>
          <h4 class="title">
            {threads[i].title} <small>{threads[i].category}</small>
          </h4>
          <div class="bottom">
            <p class="info-line">
                <span class="author">Author</span> - <span class="date">{new Date(threads[i].date).toLocaleString()}</span> - <span class="comment-count">{threads[i].comments.length} comments</span>
              <span class="comment-count">
                {threads[i].comments.length} comments
              </span>
            </p>
          </div>
        </a>
      </li>

    container.push(html);
  }

    //checks to see if logged in
    var permCreatePost =
        <div class="createPostBtn">
            
        </div>;
    if(user){
        permCreatePost = 
            <div class="createPostBtn">
                <a href="forum/create-post">
                    Create New Post
                </a>
                <br></br>
            </div>
    }

  return (
    <Layout user={user}>
      <Container>
        <h1>Bike Forum</h1>
        <br></br>
        <div class="main">
          {/* Create new post (should only be for users) */}

          {permCreatePost}

          <ol>
            {container} {/*rendering all of container list elements*/}
          </ol>
        </div>
      </Container>
    </Layout>
  );
}

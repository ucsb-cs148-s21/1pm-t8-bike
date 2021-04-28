import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import {threads} from "./data";

const textStyle = {maxWidth: "100%", width: "700px"}

// this is the main page of forum, see list of posts
export default function Forum() {
  const user = getUser();
    //<script src="data.js"></script>

     console.log(threads);
     var container = [];
    for(let i = 0; i < threads.length; i++){
        var html = 
            <li class="row">
                <a href={`/forum/${threads[i].id}`}>
                    <h4 class = "title">
                        {threads[i].title} <small>{threads[i].category}</small>
                    </h4>
                    <div class="bottom">
                        <p class="info-line">
                            <span class="author">Author</span> - <span class="date">{new Date(threads[i].date).toLocaleString()}</span> - <span class="comment-count">{threads[i].comments.length} comments</span>
                        </p>
                    </div>
                </a>
            </li>
            
            container.push(html);
    } //end for loop

  return (
    <Layout user={user}>
      <Container>
        <h1>
            Bike Forum
        </h1>
        <br></br>
        <div class="main">
            <ol>
                {container} {/*rendering all of container list elements*/}
            </ol>
        </div>
        
      </Container>
    </Layout>
  );
}



/*<body>
    <ol> 
        <li class="row"> 
            <a href="forum/item1"> 
                <div class="title">
                    <h3> Title 1 <small> Category </small> </h3>
                </div>
                <div class="bottom">
                    <p class="info-line">
                        <span class="author">Author</span> - <span class="date">04/26/2021</span> - <span class="comment-count">5 comments</span>
                    </p>
                </div>
            </a> 
        </li>
        <li class="row">
            <a href="forum/item2"> 
                <div class="title">
                    <h3> Title 2 <small> Category </small> </h3>
                </div>
                <div class="bottom">
                    <p class="info-line">
                        <span class="author">Author</span> - <span class="date">04/26/2021</span> - <span class="comment-count">5 comments</span>
                    </p>
                </div>
            </a> 
        </li>
    </ol>
</body>
*/
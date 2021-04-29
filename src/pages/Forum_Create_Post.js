import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import { Redirect } from "react-router-dom";
import { threads } from "./data";
import Forum from "./Forum";

const textStyle = { maxWidth: "100%", width: "700px" };

// when you create a post in general
export default function ForumCreatePost() {
  const user = getUser();

  function createNewPost() {
    if (
      document.getElementById("newTitle").value !== "" &&
      document.getElementById("categories").value !== "----"
    ) {
      var newPost = {
        id: threads.length + 1,
        title: document.getElementById("newTitle").value,
        category: document.getElementById("categories").value,
        author: "Placeholder",
        date: Date.now(),
        content: document.getElementById("newDescription").value,
        comments: [], //no comments
      };
      threads.push(newPost);
      console.log(threads);
      //clear all inputs
      document.getElementById("newTitle").value = "";
      document.getElementById("categories").value = "----";
      document.getElementById("newDescription").value = "";

      //go back to forum main page
      window.location.href = "/forum";
      console.log("return forum...");
    }
  }

  return (
    <Layout user={user}>
      <Container>
        <h1>
          {" "}
          {/*title*/}
          Bike Forum
        </h1>
        <br></br>
        <body>
          <textarea id="newTitle" placeholder="New Title"></textarea>
          <br></br>
          <select name="categories" id="categories">
            <option value="----">----</option>
            <option value="Announcements">Announcements</option>
            <option value="Lost and Found">Lost and Found</option>
            <option value="Crash Reports">Crash Reports</option>
            <option value="Others">Others</option>
          </select>
          <br></br>
          <textarea
            id="newDescription"
            placeholder="Your Description"
          ></textarea>
          <br></br>
          <button onClick={createNewPost}>Post it!</button>
        </body>
      </Container>
    </Layout>
  );
}

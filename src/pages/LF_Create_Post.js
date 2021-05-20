import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import { threads } from "./dataLF";
import { cache } from "./dataProfile";
import { Button, TextField } from "@material-ui/core";

const textStyle = { maxWidth: "100%", width: "700px" };

export default function LFCreatePost() {
  const user = getUser();

  function createPost() {
    if (document.getElementById("title").value !== "" && document.getElementById("description").value !== "") {
      var newPost = {
        id: threads.length + 1,
        item: document.getElementById("title").value,
        author: user,
        date: Date(),
        desc: document.getElementById("description").value,
        img: document.getElementById("image").accept,
      };
      cache.push(newPost);
      threads.push(newPost);
      console.log(threads);

      //clear all inputs
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";

      //go back to forum main page
      window.location.href = "/lostandfound";
      console.log("return lostandfound...");
    }
  }

  return (
    <Layout user={user}>
      <Container>
        <h1>Lost and Found</h1>
        <br></br>
        <body>
          <form autoComplete="off">
            <TextField required id="title" label="Title" />
            <br />
            <TextField
              required
              multiline
              rowsMax={3}
              id="description"
              label="Description"
            />
            <br />
            <br />
              <input
                accept="images/*"
                id="image"
                type="file"
              />
            <br />
            <Button onClick={createPost}>Create</Button>
          </form>
        </body>
      </Container>
    </Layout>
  );
}

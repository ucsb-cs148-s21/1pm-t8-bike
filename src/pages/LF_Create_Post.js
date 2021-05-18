import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import { threads } from "./dataLF";
import { cache } from "./dataProfile";
import { Button, TextField } from "@material-ui/core";

const textStyle = { maxWidth: "100%", width: "700px" };

function UploadButton() {
  return (
    <div>
      <input accept="image/*" id="contained-button-file" type="file" />
    </div>
  );
}

export default function LFCreatePost() {
  const user = getUser();

  function createPost() {
    if (document.getElementById("item").value !== "") {
      var newPost = {
        id: threads.length + 1,
        item: document.getElementById("item").value,
        author: user,
        date: Date(),
        desc: document.getElementById("desc").value,
        img: document.getElementById("contained-button-file").accept,
      };
      cache.push(newPost);
      threads.push(newPost);
      console.log(threads);

      //clear all inputs
      document.getElementById("item").value = "";
      document.getElementById("desc").value = "";

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
            <TextField required id="item" label="Item" />
            <br />
            <TextField
              required
              id="desc"
              multiline
              rowsMax={3}
              label="Description"
            />
            <br />
            <br />
            <input
              accept="images/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <br />
            <br />
            <Button onClick={createPost}>Create</Button>
          </form>
        </body>
      </Container>
    </Layout>
  );
}

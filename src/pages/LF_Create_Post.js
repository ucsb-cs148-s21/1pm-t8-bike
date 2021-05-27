import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";

const textStyle = { maxWidth: "100%", width: "700px" };

export default function LFCreatePost() {
  const user = getUser();

  function createPost() {
    if (document.getElementById("title").value !== "" && document.getElementById("description").value !== "") {
      const formData = new FormData();
      formData.append("username", user.email);
      formData.append("category", "Lost and Found");
      formData.append("title", document.getElementById("title").value);
      formData.append("description", document.getElementById("description").value);
      formData.append("date", new Date());
      formData.append("img", document.getElementById("image").value);
      formData.append("status", "OPEN"); 
      formData.append("numComments", 0);
      formData.append("comments", []);
      

      axios.post(`http://localhost:3001/posts/add`,formData)
        .then(res => console.log(res.data))

      axios.post(`http://localhost:3001/users/${user.email}/addPost`, formData)
        .then(res => console.log(res.data))

      //clear all inputs
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";

      //go back to forum main page
      window.location = '/lostandfound';
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

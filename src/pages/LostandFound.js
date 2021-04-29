import React from 'react';
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { Button, TextField }  from '@material-ui/core';
import Card from "react-bootstrap/Card";
import Hydro from "../images/hydro.jpg";
import getUser from "../utils/get-user";
import { threads } from "./dataLF";

const textStyle = {maxWidth: "100%", width: "700px"}

export default function LostandFound() {
  const user = getUser();
  if({user}){
    var createPost = 
        <div class="createPostBtn">
            <Button variant="contained" color="primary" href="lostandfound/create-post">Create Post</Button>
            <br></br>
        </div>
  }
  else{
    var createPost =
        <div class="createPostBtn">
            
        </div>
  }

  console.log(threads);
  var container = [];
  for(let i = 0; i < threads.length; i++){
     var html = 
         <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="Hydro" />
          <Card.Body>
            <Card.Title>{threads[i].item}</Card.Title>
            <Card.Subtitle>{threads[i].author}</Card.Subtitle>
            <Card.Text>
            {threads[i].desc}
            </Card.Text>
            <Button variant="primary" onClick="">View Route</Button>
          </Card.Body>
          <Card.Footer>
          {threads[i].date}
          </Card.Footer>
         </Card>
         
         container.push(html);
         container.push(<br/>);
  }
  
  return (
    <Layout user={user}>
      <Container>
        <h1>Lost and Found</h1>
        <br />
        {createPost}
        <br />
        {container}
      </Container>
    </Layout>
  );
}
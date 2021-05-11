import Map from './Map.js'
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import React, { Component, useState, useEffect } from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"; 
import L from 'leaflet';


function HomePage () {
  const user = getUser();
  const [data, setData] = useState("test");
  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  return (
    <Layout user={user}>
      <Container>
       <h1>Welcome to Gaucho Bike Map!</h1>
        {data}
        <button onClick={() => setData("hello")}>click</button>
        <br />
        <div>
         <a href="tel:18058932000">CALL CSO</a>
               </div>
               <br />
               <div id="map" className ="homepage" style={{ width: "50vw", height: "50vh" }}>
                 <Map />
               </div>
            </Container>

           </Layout>
  )
}

export default HomePage; 
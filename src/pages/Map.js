import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

function MyMap() {
  

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 34.4134, lng: -119.8433 }}
      //defaultOptions={{ styles: mapStyles }}
    >
      
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(MyMap));

const textStyle = {maxWidth: "100%", width: "700px"}

export default function Map() {
  const user = getUser();

  return (
    <Layout user={user}>
      <Container>
        <h1>Welcome to Gaucho Bike Map!</h1>
        <br />
        <div style={textStyle}>
          hello world!
        </div>
        <br />
        <div style={textStyle}>
          goodbye world!
        </div>
        <br />
        <div style={{ width: "50vw", height: "50vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
      </Container>
    </Layout>
  );
}

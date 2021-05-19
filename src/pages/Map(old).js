/*global google*/
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  google, 
  maps, 
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
  labels,
  labelIndex,
} from "react-google-maps";


function MyMap() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 34.4134, lng: -119.8433 }}
    ></GoogleMap>
  );
}

//jest - create factory warning for withGoogleMap(MyMap) (maybe outdated)
const MapWrapped = withScriptjs(withGoogleMap(MyMap));

//const textStyle = { maxWidth: "100%", width: "700px" };


var LatLng; 
var marker; 
// TODO: update function 
function createMarkerOnReport() {
  navigator.geolocation.getCurrentPosition(function(position) {
    LatLng = position.coords; 
  });
  new google.maps.Marker({
    position: LatLng,
    MyMap,
  });
  // marker = new google.maps.Marker({
  //   position: { lat: 12.97, lng: 77.59 },
  //   label: labels[labelIndex++ % labels.length],
  //   map: MyMap,
  // });
}

export default function Map() {
  const user = getUser();
  const [data, setData] = useState("test");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api`) 
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  return (
    <Layout user={user} display="flex" flex-direction="row">
      <Container float="left">
        <h1>Welcome to Gaucho Bike Map!</h1>
        {data}
        <button onClick={() => setData("hello")}>click</button>
        <br />
        <br />
          <div style={{ width: "50vw", height: "50vh" }}>
            <MapWrapped
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
      </Container>
      <Container >
        <button style={{float: "right"}} href="tel:18058932000">CALL CSO</button>
        <button style={{float: "right"}} onClick={createMarkerOnReport()}>Report</button>
      </Container>
    </Layout>
  );
}
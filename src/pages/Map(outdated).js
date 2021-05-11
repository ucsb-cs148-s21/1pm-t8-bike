import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

//create comp for crashes in future
export function isSameCrash(long1, lati1, long2, lati2) {
  //200ft range: .000544 for long, .000664 for lati
  if (
    Math.abs(long1 - long2) <= 0.000544 &&
    Math.abs(lati1 - lati2) <= 0.000664
  ) {
    return true;
  } else {
    return false;
  }
}

function MyMap() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 34.4134, lng: -119.8433 }}
      //defaultOptions={{ styles: mapStyles }}
    ></GoogleMap>
  );
}

//jest - create factory warning for withGoogleMap(MyMap) (maybe outdated)
const MapWrapped = withScriptjs(withGoogleMap(MyMap));

const textStyle = { maxWidth: "100%", width: "700px" };

export default function Map() {
  const user = getUser();
  const [data, setData] = useState("test");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api`)
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
        <div style={textStyle}>
          <a href="tel:18058932000">CALL CSO</a>
        </div>
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
    </Layout>
  );
}

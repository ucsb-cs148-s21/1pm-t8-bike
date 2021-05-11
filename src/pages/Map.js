import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import React, { Component, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

function MyMap() {
  React.useEffect(() => {
    // create map
    L.map("map", {
      center: [34.41317, -119.857048],
      zoom: 15,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
  }, []);
  console.log("hey");
  return <div id="map"></div>;
}
class Map extends Component{ 
  render() {
        return (
          <div className="homepage">
            <MyMap />
          </div>
        );
      }
}
export default Map;

// //google maps stuff below

// function MyMap() {
//   return (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: 34.4134, lng: -119.8433 }}
//       //defaultOptions={{ styles: mapStyles }}
//     ></GoogleMap>
//   );
// }

// const MapWrapped = withScriptjs(withGoogleMap(MyMap));

// const textStyle = { maxWidth: "100%", width: "700px" };

// export default function Map() {
//   const user = getUser();
//   const [data, setData] = useState("test");
//   useEffect(() => {
//     fetch("http://localhost:3001/api")
//       .then((res) => res.json())
//       .then((data) => setData(data.message));
//   }, []);
//   return (
//     <Layout user={user}>
//       <Container>
//         <h1>Welcome to Gaucho Bike Map!</h1>
//         {data}
//         <button onClick={() => setData("hello")}>click</button>
//         <br />
//         <div style={textStyle}>
//           <a href="tel:18058932000">CALL CSO</a>
//         </div>
//         <br />
//         <div style={{ width: "50vw", height: "50vh" }}>
//           <MapWrapped
//             googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
//             loadingElement={<div style={{ height: `100%` }} />}
//             containerElement={<div style={{ height: `100%` }} />}
//             mapElement={<div style={{ height: `100%` }} />}
//           />
//         </div>
//       </Container>
//     </Layout>
//   );
// }

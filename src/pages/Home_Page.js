import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import React, { useState, useEffect } from "react";
import Map from "./Map"; 
import Marker from './Marker';

// function setPositions (current => [...current, {
//     // lat: event.latlng.lat(),
//     // lng: event.latlng.lng(),
//     time: new Date(),
// }]);

// function getcurrentLat(){
//     //get current time and add that to the marker 
//     return navigator.geolocation.getCurrentPosition(function(position) {
//         console.log(position.coords.latitude)
//         return position.coords.latitude;
//     }); 

// }

// function getcurrentLng(){
//     //get current time and add that to the marker 
//     return navigator.geolocation.getCurrentPosition(function(position) {
//         return position.coords.longitude;
//     }); 
// }

function addMarker(setPositions) {
    // should add to db, before however should check for any exisiting markers, if markers exists, increment the numReports instead
    
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat=position.coords.latitude;
        var lng=position.coords.longitude;
        console.log(lat); 
        console.log(lng);
        setPositions(current => [...current, {
            lat: lat,
            lng: lng,
            time: new Date(),}]);
    });

}

export default function Home_Page() {
    const user = getUser();
    const [data, setData] = useState("test");
    const [positions, setPositions] = useState([]); //create positions array 
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_SERVER_URL}/api`) 
    //     .then((res) => res.json())
    //     .then((data) => setData(data.message));
    // }, []);
    return(
        <Layout user={user}>
        <Container float="left">
            <h1>Welcome to Gaucho Bike Map!</h1>
            {data}
            <button onClick={() => setData("hello")}>click</button>
            <br />
            <br />
            <div style={{ width: "75vw", height: "75vh" }}>
                <Map bootstrapURLKeys={process.env.REACT_APP_GOOGLE_KEY} positions={positions}></Map>
            </div>
        </Container>
        <Container >
            <button style={{float: "right"}} href="tel:18058932000">CALL CSO</button>
            <button style={{float: "right"}} 
                onClick={() => addMarker(setPositions)}>Report</button>
        </Container>
        </Layout>
    ); 
}; 


// onClick={(event) => setPositions(current => [...current, {
//     lat: getcurrentLat(),
//     lng: getcurrentLng(),
//     time: new Date(),
// }])}>
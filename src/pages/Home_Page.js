import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import React, { useState, useEffect } from "react";
import Map from "./Map"; 
import axios from 'axios';
import Marker from './Marker';
import { set } from "mongoose"; 

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

function addMarker(setPositions,setIsLoading) {
    // should add to db, before however should check for any exisiting markers, if markers exists, increment the numReports instead
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(function(position){
        //new marker
        const tempMarker = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            category: 'Crash Marker',
            numReports: 1,
            date: new Date().toLocaleString(),
        }
        
        //add to db, then setPositions
        axios.post(`http://localhost:3001/markers/add`,tempMarker)
            .then(res => {
                console.log(res.data)
                axios.get(`http://localhost:3001/markers`)
                    .then(res => {
                        setPositions(res.data)
                        setIsLoading(false)
                        window.alert('Marker Added!');
                    })
                    .catch(err => console.log('Error: ' + err));
            })
            .catch(err => console.log('Error: ' + err));
    })

}

export default function Home_Page() {
    const user = getUser();
    const [positions, setPositions] = useState([]);
    const [data, setData] = useState("test");
    const [isLoading, setIsLoading] = useState(false);
    //const map =  <Map bootstrapURLKeys={process.env.REACT_APP_GOOGLE_KEY} positions={positions}></Map>;
    
    //positions is state variable array of markers
    // set positions to array in db   
    //initial
    useEffect(() => {
        axios.get(`http://localhost:3001/markers`)
        .then(res => {
            setPositions(res.data); //create positions array from db
        })
        .catch(err => console.log('Error: ' + err));
    },[]); //everytime positions changes, run this usEffect
    
    console.log('homepage');

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
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css"/>
            <button style={{float: "right"}} href="tel:18058932000">CALL CSO</button>
            <button style={{float: "right"}} onClick={() => addMarker(setPositions,setIsLoading)} disabled={isLoading}>
                {!isLoading && "Report"}
                {isLoading && <i className="fa fa-refresh fa-spin"></i>}
                {isLoading && "Adding Marker"}
            </button>
        </Container>
        </Layout>
    ); 
}; 


// onClick={(event) => setPositions(current => [...current, {
//     lat: getcurrentLat(),
//     lng: getcurrentLng(),
//     time: new Date(),
// }])}>
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import React, { useState, useEffect } from "react";
import Map from "./Map";
import axios from 'axios';
import Marker from './Marker';
import { set } from "mongoose";
import { ExitToApp } from "@material-ui/icons";
// function setPositions (current => [...current, {
//     // lat: event.latlng.lat(),
//     // lng: event.latlng.lng(),
//     time: new Date(),
// }]);

//return upcoming class with travelTime and RecTimeToLeave
function currClassDisp(classIndex, todayClasses, isSetCalculating, mode){
    console.log("line 18: " + todayClasses.length);
    if(todayClasses.length !== 0){
        return(
            <p className="CurrClass">
                <h3>{todayClasses[classIndex].title}</h3>
                <p>Travel Time: {travelTime(mode,isSetCalculating)}</p>
                <p>Recommended Start Time: {calculateAlertTime(todayClasses[classIndex].start,travelTime(mode,isSetCalculating))} </p>
            </p>
        );
    }
}

function nextClassesDisp(currIndex, todayClasses){
    if(todayClasses.length !== 0){
        for(var i = currIndex; i < todayClasses.length; i++){
            return(
                <div>
                    <p className="CurrClass">
                        <h3>{todayClasses[i].title}</h3>
                    </p>
                    <br></br>
                </div>
            );
        }
    }
    
}

//function that calculates when the user should start towards their class.
//ex) if the class starts at 1 pm and it takes 10 minutes to get there, this function returns 1 pm - 10 - 3 = 12:47 pm is when you should start
function calculateAlertTime(class_start_time, travel_time){
    var str1 = class_start_time.split(':'); //spit the 13:00 pm into 13 and 00 
    var totalSecondsClassStart = parseInt(str1[0] * 3600 + str1[1] * 60); //gives us 1pm in seconds 
    var travelTimeSeconds = parseInt(travel_time * 60); //we can assume travel time was given in minutes
    var answerInSeconds = totalSecondsClassStart - travelTimeSeconds - 180; 
    var hours = Math.floor(answerInSeconds/3600); //will give 12
    var minutes = (answerInSeconds%3600)/60;
    var formatted_answer = hours.toString() + minutes.toString(); //"12:47"
    return formatted_answer;
}
  
function getcurrentLat(){
    //get current time and add that to the marker
    return navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude + " IN FUNCTION ")
        return position.coords.latitude;
    });
}
function getcurrentLng(){
    //get current time and add that to the marker
    return navigator.geolocation.getCurrentPosition(function(position) {
        return position.coords.longitude;
    });
}
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
        axios.post(`/markers/add`,tempMarker)
            .then(res => {
                console.log(res.data)
                axios.get(`/markers`)
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
const google = window.google;
function travelTime(decision, setIsCalculating) {
    setIsCalculating(true);
    navigator.geolocation.getCurrentPosition(function(position){
    var distance = require('google-distance-matrix');
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    //`${lat},${lng}` put this in origins
    // var origins = ['San Francisco CA'];
    // var destinations = ['37.230679, -121.919059'];
    var origins_lat = lat;
    var origins_lng = lng;
    var dest_lat = 37.230679;
    var dest_lng = -121.919059;
    axios.get(`/distMatrix/${decision}/${origins_lat}/${origins_lng}/${dest_lat}/${dest_lng}`)
        .then(res => { return res.data;})
        .catch(err => console.log('Error: ' + err));
});
}

export default function Home_Page() {
    const user = getUser();
    console.log(user);
    const currDate = new Date();
    //const user = getUser();
    //const [user, setUser] = useState(getUser());
    const [positions, setPositions] = useState([]);
    const [data, setData] = useState("test");
    const [isLoading, setIsLoading] = useState(false);
    const [isBikeCalculating, setIsCalculatingBike] = useState(false);
    const [isWalkCalculating, setIsCalculatingWalk] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    // gets curr day int
    const [day, setDay] = useState(currDate.getDay());
    //getDay 0-6 Su-Sat

    //gets current classes for that day, will have index 0 be most upcoming
    //var todayClasses = [];
    const [todayClasses, setTodayClasses] = useState([]);
    const [classIndex, setClassIndex] = useState(0);

    //const map =  <Map bootstrapURLKeys={process.env.REACT_APP_GOOGLE_KEY} positions={positions}></Map>;
    //positions is state variable array of markers
    // set positions to array in db
    var currClasD = null;

    //initial
    useEffect(() => {
        axios.get(`/markers`)
            .then(res => {
                setPositions(res.data); //create positions array from db
            })
            .catch(err => console.log('Error: ' + err));
        if(user !== null){
            console.log("inside Line 160");
            const days = ['Su', 'M', 'T', 'W', 'R', 'F', 'Sa'];       
            axios.get(`/users/${user.email}/courses/R`)
                .then(res => {
                    //set todayClasses
                    console.log(res.data);
                    setTodayClasses(res.data); //loops
                })
                .catch(err => console.log("Error: " + err));
        }
            //initialize todayClasses
    },[user && user.email]); //everytime positions changes, run this usEffect

    // will run every 5 minutes
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log("interval every five mins");
    //         // get currtime and compare with first element of classes of that day
    //         // if currtime grea
    //         var currHour = new Date().getUTCHours();
    //         var currMins = new Date().getUTCMinutes();

    //         var str1 = todayClasses[classIndex].start;

    //         str1 =  str1.split(':');

    //         var totalSecondsCurr = parseInt(currHour * 3600 + currMins * 60 );
    //         var totalSecondsClass = parseInt(str1[0] * 3600 + str1[1] * 60);
            
    //         if(totalSecondsCurr > totalSecondsClass){
    //             //time has passed curr class, meaning set index 1 to index 0, remove index 1
    //             setClassIndex(classIndex+1);
    //         }

    //     }, 300000);
    //     return () => clearInterval(interval);
    // },[classIndex, todayClasses]); 

    console.log('homepage');
    return(
        <Layout user={user}>
        <Container float="left">
            <h1>Welcome to Gaucho Bike Map!</h1>
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
        <Container>
            {/* right side */}
            <div>
                {/* <button style ={{float: "top"}} onClick={() => travelTime('bicycling', setIsCalculatingBike)} disabled={isBikeCalculating}>
                    {!isBikeCalculating && "I'm biking!"}
                    {isBikeCalculating && <i className="fa fa-refresh fa-spin"></i>}
                    {isBikeCalculating && "Calculating!"}
                </button>
                <button style ={{float: "top"}} onClick={() => travelTime('walking', setIsCalculatingWalk)}  disabled={isWalkCalculating}>
                    {!isWalkCalculating && "I'm walking!"}
                    {isWalkCalculating && <i className="fa fa-refresh fa-spin"></i>}
                    {isWalkCalculating && "Calculating!"}
                </button> */}
                {currClassDisp(classIndex, todayClasses, setIsCalculating, 'bicycling' )}
            </div>
            <div className="NextClasses">
                {nextClassesDisp(classIndex,todayClasses)}
            </div>
        </Container>
        </Layout>
    );
};
// onClick={(event) => setPositions(current => [...current, {
//     lat: getcurrentLat(),
//     lng: getcurrentLng(),
//     time: new Date(),
// }])}>
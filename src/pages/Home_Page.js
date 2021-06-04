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
var TTGlobal = "";
function dayFormat(days) {
    var week = "";
    if (days.M) {
      week += "M";
    }
    if (days.T) {
      week += "T";
    }
    if (days.W) {
      week += "W";
    }
    if (days.R) {
      week += "R";
    }
    if (days.F) {
      week += "F";
    }
    if (days.Sa) {
      week += "Sa";
    }
    if (days.Su) {
      week += "Su";
    }
    return week;
}
function timeFormat(time) {
    if (parseInt(time.substr(0,2)) > 12) {
        var hh = (parseInt(time.substr(0,2)) - 12);
    }
    else if (parseInt(time.substr(0,2)) === 0) {
        hh = 12;
    }
    else {
        hh = time.substr(0,2);
    }
    var mm = time.substr(2,5);
    var mid = (parseInt(time.substr(0,2)) >= 12) ? " pm" : " am" ;
    return hh + mm + mid;
}  

function nextClassesDisp(currIndex, todayClasses){
    console.log("nextClassesDisp");
    if(todayClasses.length !== 0){
        var restOfClasses = [];
        for(var i = currIndex + 1; i < todayClasses.length; i++){
            restOfClasses.push(todayClasses[i])
        }
        
        if(restOfClasses.length === 0){
            return(
                <div>
                    <p>No Future Classes...</p>
                    <hr></hr>
                </div>
            )
        }
        return restOfClasses.map(atClass => {
            return(
                <div>
                    <p className="CurrClass">
                    <h4>{atClass.title} - {atClass.location.name.replace(/-/g," ")}</h4>
                <h6>{dayFormat(atClass.days)} {timeFormat(atClass.start)} - {timeFormat(atClass.end)} </h6>
                        
                    </p>
                    <br></br>
                    <hr></hr>
                </div>
            );
        });
    }// end if     
}
function pastClassesDisp(currIndex,todayClasses){
    if(todayClasses.length !== 0){
        var restOfClasses = [];
        for(var i = 0; i < currIndex; i++){
            restOfClasses.push(todayClasses[i])
        }
        
        if(restOfClasses.length === 0){
            return(
                <div>
                    <p>No Past Classes...</p>
                    <hr></hr>
                </div>
            )
        }
        return restOfClasses.map(atClass => {
            return(
                <div>
                    <p className="CurrClass">
                        <h4>{atClass.title} - {atClass.location.name.replace(/-/g," ")}</h4>
                        <h6>{dayFormat(atClass.days)} {timeFormat(atClass.start)} - {timeFormat(atClass.end)} </h6>           
                    </p>
                    <br></br>
                    <hr></hr>
                </div>
            );
        });
    }
}
//function that calculates when the user should start towards their class.
//ex) if the class starts at 1 pm and it takes 10 minutes to get there, this function returns 1 pm - 10 - 3 = 12:47 pm is when you should start
function calculateAlertTime(class_start_time, travel_time_seconds){
    var str1 = class_start_time.split(':'); //spit the 13:00 pm into 13 and 00 
    var totalSecondsClassStart = parseInt(str1[0] * 3600 + str1[1] * 60); //gives us 1pm in seconds 
    var answerInSeconds = totalSecondsClassStart - travel_time_seconds - 180; 
    if(answerInSeconds < 0){
        answerInSeconds = 86400 + answerInSeconds;
    }
    //console.log("answerInSeconds: " + answerInSeconds);
    var hours = Math.floor(answerInSeconds/3600); //will give 12
    var minutes = Math.floor((answerInSeconds%3600)/60); //dont include seconds
    //console.log("hours: " + hours);
    //console.log("minutes: " + minutes);
    var minString = minutes.toString();
    if(minutes < 10){
        minString = '0'+minString;
    }
    var hourString = hours.toString();
    if(hourString < 10){
        hourString = '0' + hourString;
    }
    var formatted_answer = hourString + ":" + minString; //"12:47"
    //console.log("calcAlertTime: ");
    //console.log(timeFormat(formatted_answer));
    return timeFormat(formatted_answer);
}
  
function getcurrentLat(){
    //get current time and add that to the marker
    return navigator.geolocation.getCurrentPosition(function(position) {
        //console.log(position.coords.latitude + " IN FUNCTION ")
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
                //console.log(res.data)
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
function travelTime(classIndex, todayClasses, decision, setL,callback) {
    if(setL !== null){
        setL(true);
    }
    //console.log("travelTime index: " + classIndex);
    //setIsCalculating(true);
    if(todayClasses.length > 0 && classIndex < todayClasses.length){
        navigator.geolocation.getCurrentPosition(function(position){
            var distance = require('google-distance-matrix');
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            //`${lat},${lng}` put this in origins
            // var origins = ['San Francisco CA'];
            // var destinations = ['37.230679, -121.919059'];
            var origins_lat = lat;
            var origins_lng = lng;
            //console.log("origin lat/lng: " + origins_lat + ', ' + origins_lng);
            var dest_lat = todayClasses[classIndex].location.lat;
            var dest_lng = todayClasses[classIndex].location.lng;   
            //console.log("dest lat/lng: " + dest_lat + ', ' + dest_lng);     
            axios.get(`/distMatrix/${decision}/${origins_lat}/${origins_lng}/${dest_lat}/${dest_lng}`)
                .then(res => {         
                    //console.log("line 122: " + todayClasses.length);
                    
                    if(todayClasses.length !== 0){
                        //console.log(res.data);
                        callback(classIndex,todayClasses,res.data);
                        if(setL !== null){
                            setL(false);
                        }

                        //var CAT = calculateAlertTime(todayClasses[classIndex].start,TT);    
                    }
                })
                .catch(err => console.log('Error: ' + err));
            });
        return(
            <div>
                <h3>{todayClasses[classIndex].title} - {todayClasses[classIndex].location.name.replace(/-/g," ")}</h3>
                <h5>{dayFormat(todayClasses[classIndex].days)} {timeFormat(todayClasses[classIndex].start)} - {timeFormat(todayClasses[classIndex].end)} </h5>
                <p>Total Time: <span id="time"></span></p>
                <p>Recommended Time to Leave: <span id="recTime"></span></p>
                <hr></hr>
            </div>
        )
    }
    else{
        if(setL !== null){
            setL(false);
        }
        return(
            <p>No More Classes for Today..</p>
        );
    }
}
//callback function to ensure that i got time
function currClassDisp(classIndex,todayClasses,time){
    //console.log("currClassDisp index: " + classIndex);
    document.getElementById("time").innerHTML = time.text;
    //console.log("currClass Start Time: " + todayClasses[classIndex].start);
    document.getElementById("recTime").innerHTML = calculateAlertTime(todayClasses[classIndex].start, time.value);
}

function updateIndex(classIndex,todayClasses,setClassIndex,setIsRefreshing){
    setIsRefreshing(true);
    if(todayClasses.length > 0){
        
        var i;
        var totalSecondsCurr = 0;
        var totalSecondsClass = 0;
        for(i = classIndex; i < todayClasses.length; i++){              
            // get currtime and compare with first element of classes of that day
            // if currtime grea
            var currDate = new Date();
            var currHour = currDate.getHours();
            var currMins = currDate.getMinutes();

            var str1 = todayClasses[i].start;

            str1 =  str1.split(':');

            totalSecondsCurr = parseInt(currHour * 3600 + currMins * 60 );
            // console.log("totalSecondsCurr: " + totalSecondsCurr);
            // console.log("totalSecondsClass: " + totalSecondsClass);
            totalSecondsClass = parseInt(str1[0] * 3600 + str1[1] * 60);
            
            if(totalSecondsCurr <= totalSecondsClass ){
                break;
            }
        }
        setClassIndex(i);
    }
    setIsRefreshing(false);   
}

export default function Home_Page() {
    const user = getUser();
    console.log(user);
    const currDate = new Date();
    //const user = getUser();
    //const [user, setUser] = useState(getUser());
    const [positions, setPositions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isBikeCalculating, setIsCalculatingBike] = useState(false);
    const [isWalkCalculating, setIsCalculatingWalk] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    // gets curr day int
    const [day, setDay] = useState(currDate.getDay());
    //getDay 0-6 Su-Sat

    //gets current classes for that day, will have index 0 be most upcoming
    //var todayClasses = [];
    const [todayClasses, setTodayClasses] = useState([]);
    const [classIndex, setClassIndex] = useState(0);
    const [commute, setCommute] = useState('bicycling');

    //const map =  <Map bootstrapURLKeys={process.env.REACT_APP_GOOGLE_KEY} positions={positions}></Map>;
    //positions is state variable array of markers
    // set positions to array in db

    //initial
    useEffect(() => {
        axios.get(`/markers`)
            .then(res => {
                setPositions(res.data); //create positions array from db
            })
            .catch(err => console.log('Error: ' + err));
    },[]); //everytime positions changes, run this usEffect

    useEffect(() => {
         //initialize todayClasses
        if(user !== null && todayClasses.length === 0){
            console.log("inside Line 160");
            const days = ['Su', 'M', 'T', 'W', 'R', 'F', 'Sa'];       
            axios.get(`/users/${user.email}/courses/${days[day]}`)
                .then(res => {
                    console.log("inside axios");
                    if(todayClasses !== res.data){
                        //set todayClasses
                        console.log(res.data);
                        setTodayClasses([...res.data]); 
                        //set index based on time
                    }
                })
                .catch(err => console.log("Error: " + err));
        }
    },[user && user.email])

    useEffect(() => {
        if(user !== null && todayClasses.length > 0){
            var i;
            var totalSecondsCurr = 0;
            var totalSecondsClass = 0;
            for(i = 0; i < todayClasses.length; i++){              
                // get currtime and compare with first element of classes of that day
                // if currtime grea
                var currDate = new Date();
                var currHour = currDate.getHours();
                var currMins = currDate.getMinutes();

                var str1 = todayClasses[i].start;

                str1 =  str1.split(':');

                totalSecondsCurr = parseInt(currHour * 3600 + currMins * 60 );
                // console.log("totalSecondsCurr: " + totalSecondsCurr);
                // console.log("totalSecondsClass: " + totalSecondsClass);
                totalSecondsClass = parseInt(str1[0] * 3600 + str1[1] * 60);
                
                if(totalSecondsCurr <= totalSecondsClass ){
                    break;
                }
            }
            setClassIndex(i);
        }
    },[todayClasses]); 

    useEffect(() => {
        if(user !== null && todayClasses.length > 0){
            console.log("commute: " + commute);
            travelTime(classIndex,todayClasses,commute,null,currClassDisp)
        }
    },[classIndex,commute]); 

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
                <button style ={{float: "top"}} onClick={() => {setCommute('bicycling'); travelTime(classIndex,todayClasses, 'bicycling',setIsCalculatingBike,currClassDisp)}} disabled={isBikeCalculating}>
                    {!isBikeCalculating && "I'm biking!"}
                    {isBikeCalculating && <i className="fa fa-refresh fa-spin"></i>}
                    {isBikeCalculating && "Calculating!"}
                </button>
                <button style ={{float: "top"}} onClick={() => {setCommute("walking"); travelTime(classIndex,todayClasses,'walking',setIsCalculatingWalk,currClassDisp)}}  disabled={isWalkCalculating}>
                    {!isWalkCalculating && "I'm walking!"}
                    {isWalkCalculating && <i className="fa fa-refresh fa-spin"></i>}
                    {isWalkCalculating && "Calculating!"}
                </button>
                <button style ={{float: "top"}} onClick={() => {updateIndex(classIndex,todayClasses,setClassIndex,setIsRefreshing)}}  disabled={isRefreshing}>
                    {!isRefreshing && "Refresh"}
                    {isRefreshing && <i className="fa fa-refresh fa-spin"></i>}
                    {isRefreshing && "Refreshing..."}
                </button>
            </div>
            <div>
                {/* initial open and template */}
                <h2>Upcoming Class:</h2>
                {travelTime(classIndex,todayClasses,commute,null,currClassDisp)}
            </div>
            <div className="NextClasses">
                <h3>Future Classes: </h3>
                {nextClassesDisp(classIndex,todayClasses)} 
            </div>
            <div className="PastClasses">
                <h3>Past Classes: </h3>
                {pastClassesDisp(classIndex,todayClasses)}
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
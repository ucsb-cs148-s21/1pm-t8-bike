import React, { useState } from 'react';
import axios from 'axios';

//return upcoming class with travelTime and RecTimeToLeave
function currClassDisp(classIndex, todayClasses, isSetCalculating, mode){
    console.log("line 18: " + todayClasses);
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
        .then(res => { window.alert('Time calculated!'); setIsCalculating(false); return res.data;})
        .catch(err => console.log('Error: ' + err));
});
}

const Alerts = props => {
    const [isBikeCalculating, setIsCalculatingBike] = useState(false);
    const [isWalkCalculating, setIsCalculatingWalk] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [classIndex, setClassIndex] = useState(0);

    return (
        <div style={{ height: '75vh', width: '75vh' }}>
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
                {currClassDisp(classIndex,props.todayClasses, setIsCalculating, 'bicycling' )}
            </div>
            <div className="NextClasses">
                {nextClassesDisp(classIndex,props.todayClasses)}
            </div>
        </div>
    );
}

export default Alerts; 
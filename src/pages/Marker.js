import React from 'react';
import './Marker.css';  
import ReactTooltip from 'react-tooltip';
import Tooltip from "@material-ui/core/Tooltip";

const onHover = () => {
  // var element = document.getElementsByClassName('marker');
  // element.style.color = "red";
  // console.log("hovering");
  
}

//toLocaleString
const Marker = (props) => {  
    return (
      <div>
      
      <div>{props.name === "Crash Marker" &&
      <div  className="marker"
        style={{ backgroundImage: `url("hazard.png")`}} 
        //onMouseEnter={onHover}
        category={props.name}
        lat={props.lat}
        lng={props.lng}
        time={props.date}> 
      <div>{props.name === "Crash Marker" && <span className="tooltiptext">{(props.date).toString().substring(0,10)} {(props.date).toString().substring(11,16)}</span>}</div>
      </div>} 
       </div>
       
       <div> {props.name === "Bike Rack" && <div  className="bikeMarker"
       style={{ backgroundImage: `url("bike_rack_small.png")`}} 
       //onMouseEnter={onHover}
       category={props.name}
       lat={props.lat}
       lng={props.lng}
       time={props.date}>  
     </div>}
     </div>

     </div>
      // make a new div and make it visible or hidden whether or not the user is hovering 
      //    use JS for that 
    );
  };

  export default Marker;
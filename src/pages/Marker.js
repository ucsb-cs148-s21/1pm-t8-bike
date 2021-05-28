import React from 'react';
import './Marker.css';  

const onHover = () => {
  // var element = document.getElementsByClassName('marker');
  // element.style.color = "red";
  // console.log("hovering");
}

const Marker = (props) => {
    return (
      <div  className="marker"
        // style={{ backgroundImage: `url("anika.png")`}} 
        onMouseEnter={onHover}
        category={name}
        lat={props.lat}
        lng={props.lng}
        time={props.key}>
      </div>
      // make a new div and make it visible or hidden whether or not the user is hovering 
      //    use JS for that 
    );
  };

  export default Marker;
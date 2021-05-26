import React from 'react';
import './Marker.css';  

const Marker = (props) => {
    return (
      <div className="marker"
        style={{ cursor: 'pointer', backgroundImage: `url("crash_icon1.png")`}}
        category={props.name}
        lat={props.lat}
        lng={props.lng}
        time={props.key} 
        
      />
      
      
    );
  };

  export default Marker;
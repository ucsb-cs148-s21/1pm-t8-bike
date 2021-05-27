import React from 'react';
import './Marker.css';  

const Marker = (props) => {
    return (
      <div className="marker"
        key={props.key}
        style={{ cursor: 'pointer', backgroundImage: `url("crash_icon1.png")`}}
        category={props.category}
        lat={props.lat}
        lng={props.lng}
        numReports={props.numReports}
        date={props.date} 
        
      />
    );
  };

  export default Marker;
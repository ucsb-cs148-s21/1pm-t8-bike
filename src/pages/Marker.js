import React from 'react';
import './Marker.css';

const Marker = (props) => {
    const { color, name, id } = props;
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
        lat={props.lat}
        lng={props.lng}
      />
    );
  };

  export default Marker;
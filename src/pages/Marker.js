import React from 'react';
import './Marker.css';

const Marker = (props) => {
    const { color, name, id } = props;
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        category={name}
        lat={props.lat}
        lng={props.lng}
        time={props.key}
      />
    );
  };

  export default Marker;
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';


const Map = (props) => {
    const [center, setCenter] = useState({lat: 34.4134, lng: -119.8433});
    const [zoom, setZoom] = useState(11);
    console.log(props.positions); //create positions array and pass that in here 
    return (
        <div style={{ height: '75vh', width: '75vh' }}>
        <GoogleMapReact
          bootstrapURLKeys={props.bootstrapURLKeys} //props.bootstrapURLKeys or {bootstrapURLKeys}
          defaultCenter={center}
          defaultZoom={zoom}
          //googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        >
          {/* iterate through array of positions and render markers for each position  */}
          {/* <Marker
            lat={props.positions.lat}
            lng={props.positions.lng}
            name="My Marker"
            color="blue"
          /> */}
          {props.positions.map(position => 
            <Marker key={position.time.toISOString()} 
                    position={{lat: position.lat, lng: position.lng}} />)}
        </GoogleMapReact>
      </div>
    );
}

export default Map; 
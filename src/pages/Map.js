import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';


const Map = (props) => {
    const [center, setCenter] = useState({lat: 34.4134, lng: -119.8433});
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: '75vh', width: '75vh' }}>
        <GoogleMapReact
          bootstrapURLKeys={this.props.bootstrapURLKeys} //props.bootstrapURLKeys or {bootstrapURLKeys}
          defaultCenter={center}
          defaultZoom={zoom}
          //googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        >
          <Marker
            lat={34.4134}
            lng={-119.8433}
            name="My Marker"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
}

export default Map; 
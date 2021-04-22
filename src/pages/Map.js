import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const textStyle = {maxWidth: "100%", width: "700px"}
 
export class Map extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (AIzaSyDq3fF5w4Iyumsgj95iSiLtR1sxQHQII4Y)
})(Map)

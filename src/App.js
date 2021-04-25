import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CheckingSignedIn from "./pages/CheckingSignedIn";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Private from "./pages/Private";
import PageNotFound from "./pages/PageNotFound";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

function MyMap() {
  

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 34.4134, lng: -119.8433 }}
      //defaultOptions={{ styles: mapStyles }}
    >
      
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(MyMap));

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => initGoogleSignIn();
    document.body.appendChild(script);
  }, []);

  function initGoogleSignIn() {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          const isSignedIn = authInstance.isSignedIn.get();
          setIsSignedIn(isSignedIn);

          authInstance.isSignedIn.listen((isSignedIn) => {
            setIsSignedIn(isSignedIn);
          });
        });
    });
  }

  function PrivateRoute(props) {
    const { Component, ...rest } = props;
    if (isSignedIn === null) {
      return <CheckingSignedIn />;
    }
    return (
      <Route
        {...rest}
        render={() => (isSignedIn ? <Component /> : <Private />)}
      />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={Map} />
        <PrivateRoute exact path="/profile" Component={Profile} />
        <Route path="/" render={PageNotFound} />
      </Switch>
      <div style={{ width: "50vw", height: "50vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
    </BrowserRouter>
  );
}
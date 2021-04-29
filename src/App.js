import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CheckingSignedIn from "./pages/CheckingSignedIn";

import Map from "./pages/Map";
import LostandFound from "./pages/LostandFound";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import Private from "./pages/Private";
import PageNotFound from "./pages/PageNotFound";
import LFCreatePost from "./pages/LF_Create_Post";

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
        <Route exact path="/lostandfound" render={LostandFound} />
        <PrivateRoute path="/lostandfound/create-post" Component={LFCreatePost} />
        <Route exact path="/forum" render={Forum} />
        <PrivateRoute exact path="/profile" Component={Profile} />
        <Route path="/" render={PageNotFound} />
        
      </Switch>
    </BrowserRouter>
  );
}

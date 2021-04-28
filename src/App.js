import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CheckingSignedIn from "./pages/CheckingSignedIn";

import Map from "./pages/Map";
import LostandFound from "./pages/LostandFound";
import Forum from "./pages/Forum";
import ForumPost from "./pages/Forum_Post";
import Profile from "./pages/Profile";
import Private from "./pages/Private";
import PageNotFound from "./pages/PageNotFound";

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
        <Route exact path="/" component={Map} />
        <Route exact path="/lostandfound" component={LostandFound} />
        <Route exact path="/forum" component={Forum} />
        <Route path="/forum/:id(\d+)" component={ForumPost} />
        <PrivateRoute exact path="/profile" Component={Profile} />
        <Route path="/" component={PageNotFound} />
        
      </Switch>
    </BrowserRouter>
  );
}

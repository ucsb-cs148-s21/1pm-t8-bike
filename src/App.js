import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import CheckingSignedIn from "./pages/CheckingSignedIn";

import Map from "./pages/Map";
import LostandFound from "./pages/LostandFound";
import Forum from "./pages/Forum";
import ForumPost from "./pages/Forum_Post";
import Profile from "./pages/Profile";
import Private from "./pages/Private";
import PageNotFound from "./pages/PageNotFound";
import ForumCreatePost from "./pages/Forum_Create_Post";

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
  } //end initGoogleSignIn

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
  } //end PrivateRoute

  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/:url*(/+)" to={window.location.pathname.slice(0, -1)} />
        <Route exact path="/" component={Map} />
        <Route exact path="/lostandfound" component={LostandFound} />
        <Route exact path="/forum" component={Forum} />
        <PrivateRoute path="/forum/create-post" Component={ForumCreatePost} />
        <Route path="/forum/:id(\d+)" component={ForumPost} />
        <PrivateRoute exact path="/profile" Component={Profile} />
        <Route path="/" component={PageNotFound} />
        
      </Switch>
    </BrowserRouter>
  );
}

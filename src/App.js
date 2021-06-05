import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import CheckingSignedIn from "./pages/CheckingSignedIn";
import Map from "./pages/Map";
import LostandFound from "./pages/LostandFound";
import Forum from "./pages/Forum";
//import ForumPost from "./pages/Forum_Post_OLD";
import ForumPost from "./pages/Forum_Post";
import Profile from "./pages/Profile";
import Private from "./pages/Private";
import PageNotFound from "./pages/PageNotFound";
import LFCreatePost from "./pages/LF_Create_Post";
import ForumCreatePost from "./pages/Forum_Create_Post";
import ForumEditPost from "./pages/Forum_Edit_Post";
import Home_Page from "./pages/Home_Page";
import AboutUs from "./pages/AboutUs"; 

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => initGoogleSignIn();
    document.body.appendChild(script);
  }, [isSignedIn]);

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
    window.gapi.load("signin2", () => {
      window.gapi.signin2.render("login-button", {
        theme: "dark",
      });
    });
  }

  function PrivateRoute(props) {
    const { component, ...rest } = props;
    if (isSignedIn === null) {
      return <CheckingSignedIn />;
    }
    return <Route {...rest} component={isSignedIn ? component : Private} />;
  } //end PrivateRoute

  console.log('app.js');
  return (
    <BrowserRouter>
    {/* <div style={{ backgroundImage: `url("bike_backgroundclip1.jpg")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover', 
    }}> */}
      <Switch>
        <Redirect
          from="/:url*(/+)"
          to={window.location.pathname.slice(0, -1)}
        />

        {/* <Route exact path="/" component={Home_Page} /> */}
        <Route exact path="/" component={Home_Page} />
        <Route exact path="/lostandfound" component={() => <LostandFound/>} />
        <Route exact path="/aboutus" component={AboutUs} />
        <PrivateRoute
          path="/lostandfound/create-post"
          component={LFCreatePost}
        />
        <Route exact path="/forum" component={() => <Forum/>} />
        <PrivateRoute path="/forum/create-post" component={() => <ForumCreatePost/>} />
        <PrivateRoute path="/forum/edit-post/:id" component={() => <ForumEditPost/>} />
        <Route path="/forum/:id" component={() => <ForumPost/>} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route path="/PageNotFound" component={PageNotFound} />
        <Route path="/" component={PageNotFound} />
      </Switch>
      {/* </div> */}
    </BrowserRouter>
  );
}

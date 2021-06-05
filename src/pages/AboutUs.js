import React from "react";
import Layout from "../components/Layout"; 
import getUser from "../utils/get-user";
import "../index.css";


export default function MemberPage() {
  const user = getUser();

  return (
    <Layout user={user}>
      <div>
        <div style={{ maxWidth: 10000, paddingTop: 10, paddingBottom: 20, paddingLeft: 145, paddingRight: 145}}>
          {/* remove className="aboutUs" to left-align "Team Members" */}
          <h1 className="aboutUs">About Us</h1>
          <p className="paragraph-text">
            Welcome to Gaucho Bike Map! This is a CS148 Project developed by Anika
            Arora, Rukmini Bapat, Calvin Dougher, and Yvonne Liu. The goal of our
            project is to help bikers and walkers across UCSB stay safe and give them
            friendly reminders on when to start their commute towards their next class.
            We recognize that in our busy day and age, it is difficult to leave for 
            a class or commitment on time. We don't want you to have to worry about
            when exactly to leave for class or make mental calculations on whether 
            you have enough time to sprint across campus or bike too fast to make it to your next class.
            Our alerting system allows you to select which mode of transport you are 
            on in the day (walking or biking), and before your next class, our app tells
            you when to start walking or biking to your class so you can get there on time. 
            Our app also features real-time crash reporting so you can know if someone around
            you is in trouble. Commuting as a student should not be in your list of worries, 
            and we're here to help!
          </p>
          <hr />
          {/* remove className="aboutUs" to left-align "Team Members" */}
          <h1 className="aboutUs" > Team Members</h1> 
          <div className="box">
            <img src="anika2.png" className="image"/>
            <div className="member-text">
              <body className="member-name">Anika Arora</body>
              <body className="member-role">Developer</body>
              <body className="member-description">Anika is a 2nd year Computer Science major. 
              She enjoys reading, baking, playing video games, and playing the guitar.</body>
            </div>
          </div>
          <div className="box">
            <img src="ruk2.png" className="image"/>
            <div className="member-text">
              <p className="member-name">Rukmini Bapat</p>
              <p className="member-role">Developer</p>
              <p className="member-description">Rukmini is a 2nd year Computer Science major.
              She enjoys hiking, baking, and playing table-tennis.</p>
            </div>
          </div>
          <div className="box">
            <img src="calvin.png" className="image"/>
            <div className="member-text">
              <p className="member-name">Calvin Dougher</p>
              <p className="member-role">Developer</p>
              <p className="member-description">Calvin is a 2nd year Computer Science major.
              He enjoys exercising outdoors and is a member of UCSB's Ultimate Frisbee team, Black Tide.</p>
            </div>
          </div>
          <div className="box">
            <img src="yvonne2.png" className="image"/>
            <div className="member-text">
              <p className="member-name">Yvonne Liu</p>
              <p className="member-role">Developer</p>
              <p className="member-description">Yvonne is a 2nd year Computer Science major.
              She enjoys watching tv shows and playing on her Nintendo Switch.</p>
            </div>
          </div> 
          <div className="box">
            <p>App developed for CS148 S21. Check out the source code{" "}
              <a href="https://github.com/ucsb-cs148-s21/1pm-t8-bike">here</a>.
            </p>
          </div>
        </div>
        
      </div>
    </Layout>
  );
}
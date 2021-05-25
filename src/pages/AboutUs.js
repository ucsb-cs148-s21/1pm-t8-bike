import DevTeam from "../components/DevTeam";
import React from "react";
import Container from "react-bootstrap/Container";
import Layout from "../components/Layout"; 
import "../index.css"

export default function MemberPage() {
  return (
    <Layout>
      <div>
        <hr />
        <div className="w3-content" style={{ maxWidth: 1000, paddingBottom: 20}}>
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
        <Container >
          <DevTeam />
        </Container>
        </div>
      </div>
    </Layout>
  );
}
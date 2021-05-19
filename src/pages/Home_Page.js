import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import React, { useState, useEffect } from "react";
import Map from "./Map"; 

export default function Home_Page() {
    const user = getUser();
    const [data, setData] = useState("test");
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_SERVER_URL}/api`) 
    //     .then((res) => res.json())
    //     .then((data) => setData(data.message));
    // }, []);
    return(
        <Layout user={user}>
        <Container float="left">
            <h1>Welcome to Gaucho Bike Map!</h1>
            {data}
            <button onClick={() => setData("hello")}>click</button>
            <br />
            <br />
            <div style={{ width: "75vw", height: "75vh" }}>
                <Map>
                    bootstrapURLKeys=${process.env.REACT_APP_GOOGLE_KEY}
                </Map>
            </div>
        </Container>
        <Container >
            <button style={{float: "right"}} href="tel:18058932000">CALL CSO</button>
            <button style={{float: "right"}} onClick={() => setData("hi")}>Report</button>
        </Container>
        </Layout>
    ); 
}; 
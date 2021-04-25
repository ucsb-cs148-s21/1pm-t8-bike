import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";

const textStyle = {maxWidth: "100%", width: "700px"}

export default function Forum() {
  const user = getUser();

  return (
    <Layout user={user}>
      <Container>
        <h1>Welcome to forum!</h1>
        <br />
        <div style={textStyle}>
          hello world!
        </div>
        <br />
        <div style={textStyle}>
          goodbye world!
        </div>
        <br />
      </Container>
    </Layout>
  );
}

import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";

const textStyle = {maxWidth: "100%", width: "700px"}

export default function Home() {
  const user = getUser();

  return (
    <Layout user={user}>
      <Container>
        <h1>Hello World!</h1>
        <br />
        <br />
      </Container>
    </Layout>
  );
}

import Container from "react-bootstrap/Container";
import Layout from "../components/Layout";
import getUser from "../utils/get-user";

export default function PageNotFound() {
  const user = getUser();
  return (
    <Layout user={user}>
      <Container>
        <h1>This page was not found :(</h1>
      </Container>
    </Layout>
  );
}

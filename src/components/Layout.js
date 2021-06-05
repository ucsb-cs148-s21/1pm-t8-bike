import NavBar from "./NavBar";

export default function Layout(props) {
  const user = props.user;

  return (
    <div>
      <NavBar user={user} />
      {props.children}
    </div>
  );
}

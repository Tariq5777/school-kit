import axios from "axios";
import { useState } from "react";
import { Button, TextField, Container } from "@material-ui/core";
import image from "../img/SK-logo/default-monochrome-sk.svg";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { authenticate, isAuthenticated } from "../helper/auth/authUtils";

const Login = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  if (isAuthenticated()) {
    return <Redirect to="/" />
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // setIsPending(true);
    axios
      .post("http://localhost:8000/api/login/", {
        email: username,
        password: password
      })
      .then((res) => {
        console.log("Welcome");
        setLoginStatus(true);
        authenticate(res.data)
        history.push("/")
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (loginStatus) {
    return <Redirect to="/home" />
  }

  return (
    <Container maxWidth="sm">
      <form className="login" onSubmit={handleLogin}>
        <h1>Login</h1>
        <TextField
          type="text"
          label="email"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="password"
          label="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="secondary">
          Login
        </Button>
        {/* {!isPending && <button>Submit</button>}
      {isPending && <button disabled>Adding...</button>} */}
        {loginStatus && <p>Hello</p>}
      </form>
    </Container>
  );
};

export default Login;

import axios from "axios";
import { useState } from "react";
import { Button, TextField, Container } from "@material-ui/core";
import image from "../img/SK-logo/default-monochrome-sk.svg";
import { Redirect } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // setIsPending(true);
    axios
      .post("http://localhost:8000/api/login/", {
        email: username,
        password: password,
        withCredentials:true
      })
      .then(() => {
        console.log("Welcome");
        setLoginStatus(true);
        // setIsPending(false);
        // history.push('/');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if(loginStatus){
    return <Redirect to="/home"/>
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

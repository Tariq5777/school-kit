import axios from "axios";
import { useState } from "react";
import { Button, TextField, Container, Grid } from "@material-ui/core";
import image from "../img/SK-logo/default-monochrome-sk.svg";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { authenticate, isAuthenticated } from "../helper/auth/authUtils";

const Login = ({ history }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState(false);

    if (isAuthenticated()) {
        return <Redirect to="/" />;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        // setIsPending(true);
        axios
            .post("http://localhost:8000/api/login/", {
                email: username,
                password: password,
            })
            .then((res) => {
                console.log("Welcome");
                setLoginStatus(true);
                authenticate(res.data);
                history.push("/");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

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
                {!loginStatus && (
                    <Button type="submit" variant="contained" color="secondary">
                        Login
                    </Button>
                )}
                {loginStatus && (
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        disabled
                    >
                        ...
                    </Button>
                )}
                 <Grid container>
            <Grid item xs>
              <Link to="forgot-password">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
            </form>
        </Container>
    );
};

export default Login;

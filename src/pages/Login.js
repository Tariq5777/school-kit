import axios from "axios";
import { useContext, useState } from "react";
import { Button, TextField, Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { authenticate, isAuthenticated } from "../helper/auth/authUtils";
import { UserStatusContext } from '../helper/UserStatusContext'

const Login = ({ history }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { user, setUser } = useContext(UserStatusContext)

    const [values, setValues] = useState({
        error: "",
        loading: false,
        didRedirect: false
    })

    const { error, loading, didRedirect } = values;

    if (isAuthenticated()) {
        setUser(true)
        return <Redirect to="/home" />;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true })
        axios
            .post("http://localhost:7000/api/login/", {
                email: username,
                password: password,
            })
            .then(res => {
                console.log("Welcome");
                const { token } = res.data;
                if (token) {
                    authenticate(res.data, () => {
                        setValues({ ...values, loading: false })
                        setUser(true)
                        return <Redirect to="/" />
                    });
                }


            })
            .catch((err) => {
                setValues({ ...values, loading: false })
                console.log(err.message);
            });
    };

    return (
        <Container maxWidth="sm">
            <form className="login" onSubmit={handleLogin}>
                <h1>Login</h1>
                <TextField
                    type="text"
                    label="Email"
                    variant="outlined"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="secondary" disabled={loading}>
                    Login
                    </Button>
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

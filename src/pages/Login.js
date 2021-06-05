import axios from "axios";
import { useContext, useState } from "react";
import { Button, TextField, Grid, Card, Typography, FormControl, CardContent, CardActions, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { authenticate, isAuthenticated } from "../helper/auth/authUtils";
import { UserStatusContext } from '../helper/UserStatusContext'
import { Alert } from "react-bootstrap";

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
        return <Redirect to="/dashboard" />;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true })
        axios.post("http://localhost:7000/api/login/", {
            email: username,
            password: password,
        })
            .then(res => {
                console.log(res.data);
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
                setValues({ ...values, loading: false, error: "Incorrect Email/Password" })

            });
    };

    return (
        <Grid container spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '85vh', width: '100%' }}>
            <Grid item xs={12}>
                <Card elevation={3} style={{ width: '60vh', padding: "55px" }} raised={false}>
                    <Typography align="center" variant="h4"><Box fontWeight="fontWeightBold">LOGIN</Box></Typography>
                    <br />
                    <form onSubmit={handleLogin}>
                        <CardContent>
                            <FormControl margin="normal" fullWidth={true}>
                                <TextField
                                    type="text"
                                    label="EMAIL"
                                    variant="outlined"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth={true}>
                                <TextField
                                    type="password"
                                    label="PASSWORD"
                                    variant="outlined"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <FormControl fullWidth={true} style={{ marginLeft: "50px", marginRight: "50px" }}>
                                <Button style={{ paddingTop: "15px", paddingBottom: "15px" }} type="submit" variant="contained" color="secondary" disabled={loading}>
                                    Login
                                    </Button>
                            </FormControl>
                        </CardActions>
                        <CardActions style={{ marginBotton: "25px" }}>
                            <Link to="forgot-password">
                                CAN'T SIGN IN?
                                    </Link>
                        </CardActions>
                        <CardActions>
                            <Link to="register">
                                DON'T HAVE AN ACCOUNT? REGISTER HERE
                                </Link>
                        </CardActions>
                    </form>

                    {error && <Alert variant="danger" className="p-4">{error}</Alert>}

                </Card>
            </Grid>
        </Grid>
    );
};

export default Login;

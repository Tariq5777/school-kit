import { Button, TextField, Container, Grid } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [username, setUsername] = useState("");

    const handleForgotPassword = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Container maxWidth="sm">
                <form className="login" onSubmit={handleForgotPassword}>
                    <h1>Enter Email Id</h1>
                    <TextField
                        type="text"
                        label="email"
                        variant="outlined"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="secondary">
                        Forgot Password
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/login">Login</Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register">"Don't have an account? Sign Up"</Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
};

export default ForgotPassword;

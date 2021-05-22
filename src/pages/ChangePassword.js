import { Button, TextField, Container, Grid } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../helper/auth/authUtils";

const ChangePassword = ({ baseUrl }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { token } = isAuthenticated();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            current_password: currentPassword,
            new_password: newPassword,
        },
    };
    const handleChangePassword = (e) => {
        e.preventDefault();
        axios
            .put('http://localhost:8000/api/change_password/', config)
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <>
            <Container maxWidth="sm">
                <form className="login" onSubmit={handleChangePassword}>
                    <h1>Change password</h1>
                    <TextField
                        type="password"
                        label="current password"
                        variant="outlined"
                        value={currentPassword}
                        required
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />{" "}
                    <TextField
                        type="password"
                        label="new password"
                        variant="outlined"
                        value={newPassword}
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="secondary">
                        Change Password
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/home">Go back</Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
};

export default ChangePassword;

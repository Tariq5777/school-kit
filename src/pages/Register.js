import axios from "axios";
import { useState } from "react";
import {
    Button,
    TextField,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    Container,
    Grid
} from "@material-ui/core";
import { Link } from 'react-router-dom'
import { Redirect } from "react-router";
import { isAuthenticated } from "../helper/auth/authUtils";

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [standard, setStandard] = useState(1);
    const [section, setSection] = useState("");
    const [rollNo, setRollNo] = useState(0);
    const [userType, setUserType] = useState("1");

    const [registerStatus, setRegisterStatus] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (isAuthenticated()) {
        return <Redirect to="/" />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("full_name", fullName);
        data.append("email", email);
        data.append("password", password);
        data.append("user_type", parseInt(userType));

        if (parseInt(userType) === 1) {
            data.append("standard", standard);
            data.append("section", section);
            data.append("roll_no", rollNo);
        }
        console.log(data);
        axios
            .post("http://127.0.0.1:7000/api/register/", data)
            .then((res) => {
                setRegisterStatus(true);
                console.log(res);
            })
            .catch((error) => {
                setError(true);
                setErrorMessage(error.response.data.message);
                console.log(error.response.data.message);
            });
    };
    if (registerStatus) {
        return <Redirect to="/login" />;
    }

    return (
        <Container maxWidth="sm" style={{marginBottom:"2rem"}}>
            {error && <p>{errorMessage}</p>}
            <h1>Register User</h1>
            <form onSubmit={handleSubmit}>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        type="text"
                        id="outlined-basic"
                        label="Full Name"
                        required
                        variant="outlined"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        type="email"
                        id="outlined-basic"
                        label="Email"
                        required
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        type="password"
                        required
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                {/* ACCOUNT TYPE RADIO BUTTON */}
                <FormControl margin="normal">
                    <FormLabel component="legend">Account Type</FormLabel>
                    <RadioGroup
                        row
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Student"
                        />
                        <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="Teacher"
                        />
                    </RadioGroup>
                </FormControl>
                {/*END ACCOUNT TYPE RADIO BUTTON */}

                {parseInt(userType) === 1 && (
                    <div>
                        <div>
                            <TextField
                                type="number"
                                id="class"
                                label="Class"
                                variant="outlined"
                                margin="normal"
                                required
                                disabled={parseInt(userType) === 2}
                                value={standard}
                                onChange={(e) => setStandard(e.target.value)}
                            />
                            <TextField
                                type="text"
                                id="section"
                                label="section"
                                variant="outlined"
                                margin="normal"
                                required
                                disabled={parseInt(userType) === 2}
                                style={{ marginLeft: "10px" }}
                                value={section}
                                onChange={(e) => setSection(e.target.value)}
                            />
                        </div>
                        <FormControl margin="normal" fullWidth={true}>
                            <TextField
                                type="number"
                                id="rollno"
                                label="Roll Number"
                                variant="outlined"
                                required
                                disabled={parseInt(userType) === 2}
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                            />
                        </FormControl>
                    </div>
                )}
                <FormControl fullWidth={true}>
                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                        {" "}
                        Register
                    </Button>
                </FormControl>
                <Grid container style={{marginTop:"20px"}}>
                    <Grid item xs>
                        <Link to="/login">Already have an account ? Sign In</Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Register;

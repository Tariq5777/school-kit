import {
    Avatar,
    Button, Card, CardContent, Container, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography,
} from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../helper/auth/authUtils";
import face4 from "../img/faces/face4.jpg";
const Profile = () => {
    const [profile, setProfile] = useState({
        acc_type: 0,
        email: "",
        full_name: "",
        roll_no: 0,
        section: "",
        standard: 0,
    });

    useEffect(() => {
        axios.get("api/profile/", { headers: { Authorization: `Bearer ${isAuthenticated().token}` } })
            .then(res => setProfile({ ...res.data }))
    }, [])

    return (
        <Container
            maxWidth="md"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
            }}
        >
            <div className="profile-image">
                <Avatar
                    alt="Remy Sharp"
                    src={face4}
                    style={{
                        width: "100px",
                        height: "100px",
                        alignItems: "center",
                    }}
                />
            </div>
            <Card
                elevation={2}
                raised={false}
                style={{ width: "400px", marginTop: "1rem" }}
            >
                <CardContent>
                    <Typography variant="h4" component="h4">
                        My Profile
                    </Typography>
                </CardContent>
                <CardContent>
                    <TableContainer component={Paper} variant="outlined">
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h5">
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5">
                                            {profile.full_name}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h5">
                                            Email
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5">
                                            {profile.email}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h5">
                                            Class
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5">
                                            {profile.standard}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h5">
                                            Section
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5">
                                            {profile.section}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardContent>
                    <Link to="/change-password" style={{ color: "white", textDecoration: "none" }}>
                        <Button variant="contained" color="secondary">
                            Change Password
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Profile;

import {
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
} from "@material-ui/core";
import { isAuthenticated } from "../helper/auth/authUtils";
import { UserStatusContext } from "../helper/UserStatusContext";
import { useContext, useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
    const [isPending, setIsPending] = useState(true);
    const { user, setUser } = useContext(UserStatusContext);
    const [profile, setProfile] = useState({
        acc_type: 0,
        email: "",
        full_name: "",
        roll_no: 0,
        section: "",
        standard: 0,
    });

    const { token } = isAuthenticated();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const url = "http://localhost:7000/api/profile/";

    useEffect(() => {
        setTimeout(() => {
            axios
                .get(url, config)
                .then((res) => {
                    const {
                        acc_type,
                        full_name,
                        email,
                        roll_no,
                        section,
                        standard,
                    } = res.data;
                    setProfile({
                        acc_type,
                        full_name,
                        email,
                        roll_no,
                        section,
                        standard,
                    });
                    // setUserType({acc_type});
                    // console.log(profile);
                    setIsPending(false);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }, 500);
    }, []);
    // profile.acc_type = 2;
    if (isAuthenticated()) {
        setUser(true);
    }

    function createData(
        day,
        subject1,
        subject2,
        subject3,
        Lunch,
        subject4,
        subject5
    ) {
        return { day, subject1, subject2, subject3, Lunch, subject4, subject5 };
    }
    const day = "Monday";
    const subject1 = "Mathematics";
    const Lunch = "Lunch";
    const subject2 = subject1;
    const subject3 = subject1;
    const subject4 = subject1;
    const subject5 = subject1;
    const rows = [
        createData(
            day,
            subject1,
            subject2,
            subject3,
            Lunch,
            subject4,
            subject5
        ),
    ];

    return (
        <Container
            maxWidth="lg"
            style={{ marginBottom: "450px" }}
            component={Paper}
        >
            <Grid
                container
                spacing={4}
                direction="column"
                style={{ overflowX: "auto" }}
            >
                <Grid item>
                    <Typography variant="h4" gutterBottom display="block">
                        Todays Time Table (date)
                    </Typography>
                </Grid>
                <Grid item style={{ overflowX: "auto" }} className="long-table">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow component={Paper}>
                                <TableCell>Day / Time</TableCell>
                                <TableCell>8:00 - 9:00</TableCell>
                                <TableCell>9:00 - 10:00</TableCell>
                                <TableCell>10:00 - 11:00</TableCell>
                                <TableCell>Break {profile.full_name}</TableCell>
                                <TableCell>11:30 - 12:30</TableCell>
                                <TableCell>12:30 - 01:30</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody component={Paper}>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {day}
                                </TableCell>
                                <TableCell>{subject1}</TableCell>
                                <TableCell>{subject2}</TableCell>
                                <TableCell>{subject3}</TableCell>
                                <TableCell>{Lunch}</TableCell>
                                <TableCell>{subject4}</TableCell>
                                <TableCell>{subject5}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid
                    item
                    style={{ overflowX: "auto" }}
                    className="short-table"
                >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow component={Paper}>
                                <TableCell>Day / Time</TableCell>
                                <TableCell component="th" scope="row">
                                    {day}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody component={Paper}>
                            <TableRow>
                                <TableCell>8:00 - 9:00</TableCell>
                                <TableCell>{subject1}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>9:00 - 10:00</TableCell>
                                <TableCell>{subject2}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>10:00 - 11:00</TableCell>
                                <TableCell>{subject3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Break {profile.full_name}</TableCell>
                                <TableCell>{Lunch}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>11:30 - 12:30</TableCell>
                                <TableCell>{subject4}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>12:30 - 01:30</TableCell>
                                <TableCell>{subject5}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid
                    item
                    style={{ display: "flex" }}
                    className="dashboard-section"
                >
                    <Card style={{ margin: "1rem 1rem 1rem 0" }}>
                        <CardContent>
                            <Typography variant="h4">
                                Ongoing Classes
                            </Typography>
                            <Link>
                                <Typography>Ongoing class</Typography>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card style={{ margin: "1rem 1rem" }}>
                        <CardContent>
                            <Typography variant="h4">Recent Classes</Typography>
                            <Typography variant="h4">data</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item style={{ display: "flex" }} >
                    <Card style={{ margin: "1rem 1rem 1rem 0" }}md ={4}>
                        <CardContent>
                            <Typography variant="h4">Queries</Typography>
                            <Typography variant="h4">query</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TeacherDashboard;

import {
    Box,
    Card,
    CardContent,
    CardHeader,
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

const StudentDashboard = () => {
    const [isPending, setIsPending] = useState(true);
    const { user, setUser } = useContext(UserStatusContext);
    // const [userType, setUserType]= useState(0);
    const [profile, setProfile] = useState({
        acc_type: 0,
        email: "",
        full_name: "",
        roll_no: 0,
        section: "",
        standard: 0,
    });
    const [timetable, setTimetable] = useState({
        day: 0,
        tt: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" }
    })
    const [liveClass, setLiveClass] = useState([])
    const [recentClasses, setRecentClasses] = useState([]);
    const { token } = isAuthenticated();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const url = "api/profile/"
    document.title = "Dashboard";

    useEffect(() => {
        axios.get(url, config).then(res => {
            const { acc_type, full_name, email, roll_no, section, standard, } = res.data;
            setProfile({ acc_type, full_name, email, roll_no, section, standard, });
            setIsPending(false);
        }).catch((err) => {
            console.log("Profile Error", err.message);
        });
        axios.get("extra/timetable/today/", config)
            .then((response) => setTimetable({ day: response.data.day, tt: { ...response.data.timetable } }))
        axios.get("user/liveclass/", config)
            .then(res => setLiveClass(res.data))
        axios
            // Recent Classes Not Working In Student
            .get('extra/recent/', config)
            .then(res => {
                setRecentClasses(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err.response.status))
    }, []);

    const schedule = ["8:00 - 9:00", "9:00 - 10:00", "10:00 - 11:00", "11:00-12:00", "12:00-1:00", "1:00-2:00", "2:00-3:00", "3:00-4:00"]

    return (
        <Container
            maxWidth="lg"
            style={{ marginTop: "60px" }}
            component={Paper}
        >
            <div style={{ paddingTop: "25px" }}>
                <Card elevation={2} raised={false} style={{ overflowX: "auto" }}>
                    <CardContent><Typography variant="h4" component="h4">Today TimeTable</Typography></CardContent>
                    <CardContent>
                        <TableContainer component={Paper} variant="outlined">
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Box fontWeight="fontWeightBold">Day/Time</Box></TableCell>
                                        {schedule.map((s, i) =>
                                            <TableCell key={i}><Box fontWeight="fontWeightBold">{s}</Box></TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Box fontWeight="fontWeightBold">{timetable.day}</Box>
                                        </TableCell>
                                        {
                                            Object.entries(timetable.tt).map(row => (
                                                <TableCell component="th" scope="row" key={row[0]}>{row[1]}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </div>

            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card style={{ margin: "3rem 1rem 1rem 0" }}>
                        <CardContent>
                            <Typography variant="h4">Ongoing Classes</Typography>
                        </CardContent>
                        <CardContent>
                            <TableContainer component={Paper} variant="outlined">
                                <Table size="medium">
                                    <TableHead>
                                        <TableRow>
                                            {["Meet ID", "Date", "Subject"].map((data, key) =>
                                                <TableCell key={key}><Box fontWeight="fontWeightBold">{data}</Box></TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {liveClass.map(live =>
                                            <TableRow key={live.id}>
                                                <TableCell component="th" scope="row">
                                                    <Link to={window.location.pathname} onClick={
                                                        () => window.open(`https://meet.google.com/${live.meet_id}`)}>
                                                        {live.meet_id}
                                                    </Link>
                                                </TableCell>
                                                <TableCell component="th" scope="row">{live.date}</TableCell>
                                                <TableCell component="th" scope="row">{live.subject}</TableCell>
                                            </TableRow>
                                        )}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card  style={{ margin: "3rem 1rem 1rem 0" }}>
                        <CardContent>
                            <Typography variant="h4">Recent Classes</Typography>
                        </CardContent>
                        <CardContent>
                            <TableContainer component={Paper} variant="outlined">
                                <Table size="medium">
                                    <TableHead>
                                        <TableRow>
                                            {["Meet ID", "Date", "Subject"].map((data, key) =>
                                                <TableCell key={key}><Box fontWeight="fontWeightBold">{data}</Box></TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentClasses.map(recent =>
                                            <TableRow key={recent.id}>
                                                <TableCell component="th" scope="row">{recent.meet_id}</TableCell>
                                                <TableCell component="th" scope="row">{recent.date}</TableCell>
                                                <TableCell component="th" scope="row">{recent.subject}</TableCell>
                                            </TableRow>
                                        )}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>


            </Grid>

        </Container>
    );
};

export default StudentDashboard;

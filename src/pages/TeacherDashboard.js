import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    Button
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
import { useHistory } from "react-router-dom";
import { Row, Col } from 'react-bootstrap'


const TeacherDashboard = () => {
    const [isPending, setIsPending] = useState(true);
    const { user, setUser } = useContext(UserStatusContext);
    const [profile, setProfile] = useState({
        acc_type: 0, email: "", full_name: "", roll_no: 0, section: "", standard: 0,
    });
    const [recentClasses, setRecentClasses] = useState([])
    const history = useHistory();
    const [liveClass, setLiveClass] = useState([]);

    const standardID = useState({
        standard: "",
        section: ""
    })

    const schedule = [
        "8:00 - 9:00",
        "9:00 - 10:00",
        "10:00 - 11:00",
        "11:00-12:00",
        "12:00-1:00",
        "1:00-2:00",
        "2:00-3:00",
        "3:00-4:00",
    ];

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
                    setIsPending(false);
                })
                .catch((err) => {
                    console.log(err.message);
                });
            axios.get("/user/liveclass/", config).then((res) => {
                setLiveClass(res.data);
            });
            axios.get('/extra/recent/', config).then(res => setRecentClasses(res.data))
        });
    }, []);

    if (isAuthenticated()) {
        setUser(true);
    }

    return (
        <Container
            maxWidth="lg"
            style={{ marginTop: "60px" }}
            component={Paper}
        >

            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Card elevation={2} raised={false} style={{ overflowX: "auto" }}>
                    <CardContent>
                    <Typography variant="h4" component="h4" style={{disply:"inline"}}>TimeTable Options</Typography>
                    </CardContent>
                    <CardContent className ="timetable-options">
                        <Button onClick={()=>history.push("/timetable")} variant="outlined" color="secondary" style={{disply:"inline"}}>See Time Table</Button>
                        <Button onClick={()=>history.push("/update-timetable")} variant="outlined" color="secondary" style={{disply:"inline"}}>Update Time Table</Button>
                        <Button onClick={()=>history.push("/add-timetable")} variant="outlined" color="secondary" style={{disply:"inline"}}>Add Time Table</Button>
                    </CardContent>
                </Card>
            </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
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
                    {profile.acc_type === 1 && 
                    (
                <Grid item xs={12} md={4}>
                        <Card style={{ margin: "3rem 1rem" }}>
                            <CardContent>
                                <Typography variant="h4">
                                    Recent Classes
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="h4">User {profile.acc_type}</Typography>
                            </CardContent>
                        </Card>
                </Grid>
                    )}
            </Grid>

        </Container>
    );
};

export default TeacherDashboard;

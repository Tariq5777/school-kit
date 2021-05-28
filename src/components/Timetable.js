import {
    Box,
    Card,
    Typography,
    CardContent,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { useState } from "react";

const Timetable = () => {
    const [timetable, setTimetable] = useState([
        {
            0: "Day / Time",
            1: "8:00 - 9:00",
            2: "9:00 - 10:00",
            3: "10:00 - 11:00",
            4: "11:00-12:00",
            5: "12:00-1:00",
            6: "1:00-2:00",
            7: "2:00-3:00",
            8: "3:00-4:00",
        },
        { 0: "Monday", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
        {
            0: "Tuesday",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
        },
        {
            0: "Wednesday",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
        },
        {
            0: "Thursday",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
        },
        { 0: "Friday", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
    ]);

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

    return (
        <Container style={{ paddingTop: "25px" }}>
            <Card elevation={2} raised={false} style={{ overflowX: "auto" }}>
                <CardContent>
                    <Typography variant="h4" component="h4">
                        Today TimeTable
                    </Typography>
                </CardContent>
                <CardContent>
                    <TableContainer component={Paper} variant="outlined">
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Box fontWeight="fontWeightBold">
                                            Day/Time
                                        </Box>
                                    </TableCell>
                                    {schedule.map((s, i) => (
                                        <TableCell key={i}>
                                            <Box fontWeight="fontWeightBold">
                                                {s}
                                            </Box>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {timetable.slice(1,timetable.length).map((item, index) => (

                                    <TableRow key = {index}>
                                        <TableCell>{item[0]}</TableCell>
                                        <TableCell>{item[1]}</TableCell>
                                        <TableCell>{item[2]}</TableCell>
                                        <TableCell>{item[3]}</TableCell>
                                        <TableCell>{item[4]}</TableCell>
                                        <TableCell>{item[5]}</TableCell>
                                        <TableCell>{item[6]}</TableCell>
                                        <TableCell>{item[7]}</TableCell>
                                        <TableCell>{item[8]}</TableCell>
                                        <TableCell>{item[9]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Timetable;

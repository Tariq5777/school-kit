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

const Timetable = ({ timetable, schedule }) => {

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return (
        <Container style={{ paddingTop: "25px" }}>
            <Card elevation={2} raised={false} style={{ overflowX: "auto" }}>
                <CardContent>
                    <Typography variant="h3" component="h3" align="center">
                        <Box fontWeight="fontWeightBold">Time Table</Box>
                    </Typography>
                </CardContent>
                <CardContent>
                    <TableContainer component={Paper} variant="outlined">
                        <Table size="medium">
                            <TableHead>
                                <TableRow >
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
                                {Object.entries(timetable).map((item, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell><Box fontWeight="fontWeightBold">{days[item[0]]}</Box></TableCell>
                                        {Object.entries(item[1]).map(item =>
                                            <TableCell key={item[0]}>{item[1]}</TableCell>)
                                        }
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

import {
    Card,
    CardContent,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import { useState } from "react";

const Attendance = () => {
    const [attendanceDetails, setAttendanceDetails] = useState([1,"12 Dec", "XYZ", "Math", 34]);

    return (
        <Container maxWidth="md">
            <Card>
                <CardContent>
                    <Typography variant="h4">Attendance</Typography>
                </CardContent>
                <CardContent>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    {[
                                        "S. No",
                                        "Date",
                                        "Meet Id",
                                        "Subject",
                                        "Duration",
                                    ].map((text) => (
                                        <TableCell>
                                            <Typography
                                                variant="h6"
                                                style={{ fontWeight: "bold" }}
                                                color="primary"
                                            >
                                                {text}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {attendanceDetails.map((text) => (
                                        <TableCell>
                                        <Typography
                                            variant="h6"
                                            style={{ fontWeight: "bold" }}
                                            color="inherit"
                                        >
                                            {text}  
                                        </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Attendance;

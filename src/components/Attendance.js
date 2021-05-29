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

const Attendance = ({ attendance }) => {

    return (
        <Container maxWidth="md">
            <Card>
                <CardContent style= {{textAlign:"center"}}>
                    <Typography variant="h3">Attendance</Typography>
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
                                                color="primary">
                                                {text}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendance.map((att, index) =>
                                    <TableRow key={index}>
                                        <TableCell><Typography
                                            variant="h6"
                                            style={{ fontWeight: "bold" }}
                                            color="inherit">
                                            {index + 1}
                                        </Typography></TableCell>
                                        <TableCell>{att.date}</TableCell>
                                        <TableCell>{att.class_record}</TableCell>
                                        <TableCell>{att.subject}</TableCell>
                                        <TableCell>{att.duration}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Attendance;

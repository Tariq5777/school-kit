import {
    Button,
    Backdrop,
    Card,
    CardContent,
    Container,
    Table,
    TableBody,
    TableFooter,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Modal,
    // IconButton,
    Typography,
} from "@material-ui/core";
// import FirstPageIcon from '@material-ui/icons/FirstPage';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import LastPageIcon from '@material-ui/icons/LastPage';
import { useState } from "react";
import Transcript from "./Transcript";
// import Transcript from "./Transcript";
const MeetSummary = ({ meetSummary }) => {
    
    const [transcriptOpen, setTranscriptOpen] = useState(false);

    const meetTableData = [
        { meet_id: "First", class: "1 A", date: "29 May" },
        { meet_id: "Second", class: "2 A", date: "29 May" },
    ];

    return (
        <Container maxWidth="md">
            <Card>
                <CardContent style={{ textAlign: "center" }}>
                    <Typography variant="h3">Meet Summary</Typography>
                </CardContent>
                <CardContent>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    {[
                                        "S No.",
                                        "Meet Id",
                                        "Class",
                                        "Date",
                                        "Action",
                                    ].map((text) => (
                                        <TableCell key={text}>
                                            <Typography variant="h5">
                                                {text}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meetTableData.map((data, key) => (
                                    <TableRow key={key}>
                                        <TableCell>{key}</TableCell>
                                        <TableCell>{data.meet_id}</TableCell>
                                        <TableCell>{data.class}</TableCell>
                                        <TableCell>{data.date}</TableCell>
                                        <TableCell
                                            style={{
                                                display: "flex",
                                                justifyContent: "start",
                                            }}
                                        >
                                            <Button
                                                onClick={() =>
                                                    setTranscriptOpen(
                                                        !transcriptOpen
                                                    )
                                                }
                                                color="secondary"
                                                variant="outlined"
                                                style={{
                                                    margin: " 0 1rem",
                                                }}
                                            >
                                                Transcript
                                            </Button>
                                            <Modal
                                                open={transcriptOpen}
                                                onClose={() =>
                                                    setTranscriptOpen(
                                                        !transcriptOpen
                                                    )
                                                }
                                                aria-labelledby="transition-modal-title"
                                                aria-describedby="transition-modal-description"
                                                BackdropComponent={Backdrop}
                                                BackdropProps={{
                                                    timeout: 500,
                                                }}
                                            >
                                                {/* Transcript Component */}
                                                <Transcript data={data} />
                                            </Modal>
                                            <Button
                                                color="secondary"
                                                variant="outlined"
                                                style={{
                                                    margin: " 0 1rem",
                                                }}
                                            >
                                                Summary
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                   <TableCell>
                                        Table Footer
                                   </TableCell>
                                   <TableCell>
                                        Table Footer
                                   </TableCell>
                                   <TableCell>
                                        Table Footer
                                   </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Container>
    );
};

export default MeetSummary;

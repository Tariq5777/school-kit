    import {
    Button, Card, CardContent, Container, Table, TableBody, TableFooter, TableCell, TableContainer, TableHead, TableRow, Typography
} from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../../helper/auth/authUtils";
import SummaryModal from "../../components/SummaryModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import TranscriptModal from "../../components/TranscriptModal";
const MeetSummary = () => {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({ title: "", transcript: "" })
    const [meetTableData, setMeetTableData] = useState([]);
    const [transcript, setTranscript] = useState([]);
    const [openT,setOpenT] = useState(false);
    const config = {
        headers: {
            Authorization: `Bearer ${isAuthenticated().token}`,
        },
    };
    useEffect(() => {
        axios.get('/extra/meetsummary/', config).then(res =>
            setMeetTableData(res.data))
    }, [])


    const getTranscript = (id) => {
        axios.get(`extra/meetsummary/t/${id}`, config).then(res => {
            const data = JSON.parse(res.data.transcript)
            setTranscript(data)
            setOpenT(true)
        })
    }

    const getSummary = (id, meet_id) => {
        axios.get(`extra/meetsummary/s/${id}`, config).then(res => {
            setData({ title: meet_id, transcript: res.data.summary })
            setOpen(true)
        })
    }

    return (
        <Container maxWidth="md">
            <SummaryModal data={data} open={open} onClose={() => setOpen(false)}>
            </SummaryModal>
            <TranscriptModal data = {transcript} open={openT} onClose={() => setOpenT(false)}>
            </TranscriptModal>
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
                                        "S.No",
                                        "MEET ID",
                                        "CLASS",
                                        "DATE",
                                        "ACTION",
                                    ].map((text) => (
                                        <TableCell key={text}>
                                            <Typography variant="h5" align="center">
                                                {text}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meetTableData.map((data, key) => (
                                    <TableRow key={key}>
                                        <TableCell className="text-center">{key + 1}</TableCell>
                                        <TableCell className="text-center">{data.meet_id}</TableCell>
                                        <TableCell className="text-center">{data.standard} {data.section}</TableCell>
                                        <TableCell className="text-center">{data.date}</TableCell>
                                        <TableCell style={{ display: "flex", justifyContent: "center" }}>
                                            <Button onClick={() => { getTranscript(data.id); }}
                                                color="primary"
                                                variant="contained"
                                                style={{ margin: " 0 1rem", }}>
                                                Transcript
                                            </Button>
                                            <Button onClick={() => { getSummary(data.id, data.meet_id); }}
                                                color="secondary"
                                                variant="contained"
                                                style={{ margin: " 0 1rem", }}>
                                                Summary
                                            </Button>
                                        </TableCell>
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

export default MeetSummary;

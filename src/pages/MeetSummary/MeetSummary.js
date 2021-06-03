    import {
    Button, Card, CardContent, Container, Table, TableBody, TableFooter, TableCell, TableContainer, TableHead, TableRow, Typography
} from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../../helper/auth/authUtils";
import ModalView from "../../components/ModalView";
import 'bootstrap/dist/css/bootstrap.min.css';
const MeetSummary = () => {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({ title: "", transcript: "" })
    const [meetTableData, setMeetTableData] = useState([]);

    useEffect(() => {
        axios.get('/extra/meetsummary/', { headers: { Authorization: `Bearer ${isAuthenticated().token}` } }).then(res =>
            setMeetTableData(res.data))
    }, [])


    const getTranscript = (id, meet_id) => {
        axios.get(`extra/meetsummary/t/${id}`, { headers: { Authorization: `Bearer ${isAuthenticated().token}` } }).then(res => {
            setData({ title: meet_id, transcript: res.data.transcript })
            setOpen(true)

        })
    }

    const getSummary = (id, meet_id) => {
        axios.get(`extra/meetsummary/s/${id}`, { headers: { Authorization: `Bearer ${isAuthenticated().token}` } }).then(res => {
            setData({ title: meet_id, transcript: res.data.summary })
            setOpen(true)
        })
    }

    return (
        <Container maxWidth="md">
            <ModalView data={data} open={open} onClose={() => setOpen(false)}>
            </ModalView>
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
                                            <Button onClick={() => { getTranscript(data.id, data.meet_id); }}
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

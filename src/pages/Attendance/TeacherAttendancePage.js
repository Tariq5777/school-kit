import { Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react"
import { Container, Card, Row, Col, Table } from "react-bootstrap"
import { isAuthenticated } from "../../helper/auth/authUtils";

const TeacherAttendancePage = () => {

    const [allMeets, setAllMeets] = useState([]);
    const [meetId, setMeetId] = useState("");
    const [meetAttendance, setMeetAttendance] = useState([]);
    const [standard, setStandard] = useState([]);
    const [open, setOpen] = useState(false);

    const config = {
        headers: {
            Authorization: `Bearer ${isAuthenticated().token}`,
        }
    }
    useEffect(() => {
        axios.get("extra/meetsummary/", config)
            .then(res => {
                setAllMeets(res.data);
                console.log(res.data);
            })
            .catch(err => { console.log(err.message) })
    }, []);

    useEffect(() => {
        axios.get(`extra/attendance/${meetId}/`, config)
            .then(res => { setMeetAttendance(res.data) })
            .catch(err => { console.log(err.message) })
    }, [meetId]);

    return (
        <Container>
            <Card>
                <Card.Body>
                    {!open && <Card.Title> <Typography variant="h3" color="primary">
                        Attendance
                    </Typography><br/>
                    <h4>Classes</h4><br/>
                    </Card.Title>}
                    {open && <Card.Title onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
                        <Typography variant="h3" color="secondary">
                            Go Back
                        </Typography>
                    </Card.Title>}
                    <Row>
                        <Col>
                            {!open &&
                                <Table hover responsive>
                                    <thead>
                                        <tr>
                                            {[
                                                "ID",
                                                "Standard",
                                                "Section",
                                                "Meet ID",
                                                "Date",
                                                "Subject",
                                            ].map(text => (
                                                <th key={text}>{text}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allMeets.map((data, key) => (
                                            <tr key={key} onClick={() => {
                                                setMeetId(data.meet_id);
                                                setOpen(!open);

                                            }} style={{ cursor: "pointer" }}>
                                                <td>{data.id}</td>
                                                <td>{data.standard}</td>
                                                <td>{data.section}</td>
                                                <td>{data.meet_id}</td>
                                                <td>{data.date}</td>
                                                <td>{data.subject}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            }
                            {open &&
                                <Table hover responsive>
                                    <thead>
                                        <tr>
                                            {[
                                                "ID",
                                                "Name",
                                                "Attended Duration",
                                            ].map(text => (
                                                <th key={text}>{text}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {meetAttendance.map((data, key) => (
                                            <tr key={key}>
                                                <td>{data.id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.attended_duration}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            }
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default TeacherAttendancePage;

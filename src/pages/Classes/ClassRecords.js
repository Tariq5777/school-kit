import { Container } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Table,
    Card,
    Col,
    Dropdown,
    DropdownButton,
    Row,
} from "react-bootstrap";
import { isAuthenticated } from "../../helper/auth/authUtils";

const ClassRecords = () => {
    const [standard, setStandard] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classRecord, setClassRecord] = useState([]);
    const [sid, setSID] = useState(0);
    const [dropdownStandard, setDropdownStandard] = useState("Select Standard");
    const [dropdownSubject, setDropdownSubject] = useState("Select Subject");

    const config = {
        headers: {
            Authorization: `Bearer ${isAuthenticated().token}`,
        },
    };


    useEffect(() => {
        const data = {
            "standard": 1,
            "section" : "A"
        }
        axios.get(`http://localhost:7000/extra/classrecord/standard/`,data, config)
        .then(res =>{
            setClassRecord(res.data);
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err.message);
        })
    }, [])

    useEffect(() => {
        get_standard();
        get_subject();
    }, []);

    const get_standard = () => {
        axios.get("api/standard/", config).then((res) => setStandard(res.data));
    };

    const get_subject = () => {
        axios
            .get("api/subjects/", config)
            .then((res) => {
                setSubjects(res.data);
                console.log(subjects);
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Class Records</Card.Title>
                    <Row>
                        <Col>
                            <DropdownButton
                                title={dropdownStandard}
                                onSelect={(e) => setSID(e)}
                            >
                                {standard.map((std) => (
                                    <Dropdown.Item
                                        key={std.id}
                                        eventKey={std.id}
                                        onSelect={() =>
                                            setDropdownStandard(
                                                std.standard + " " + std.section
                                            )
                                        }
                                    >
                                        {std.standard + " " + std.section}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </Col>
                        <Col>
                            <DropdownButton
                                title={dropdownSubject}
                                // onSelect={(e)=>setSubjectRecord(e)}
                            >
                                {subjects.map((subject) => {
                                    <Dropdown.Item
                                        key={subject.id}
                                        eventKey={subject.id}
                                        value={subject.subject}
                                        onSelect={() =>
                                            setDropdownSubject(subject.subject)
                                        }
                                    >
                                        {subject}
                                    </Dropdown.Item>;
                                })}
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Row > 
                        <Col>
                            <Table responsive hover className="mt-4">
                                <thead>
                                    <tr>
                                        {[
                                            "ID",
                                            "Meet ID",
                                            "Date",
                                            "Started At",
                                            "Ended At",
                                            "Duration",
                                            "Subject",
                                        ].map(text=>(
                                            <th key={text}>{text}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {classRecord.map((data, key)=>(
                                        <tr key= {key}>
                                            <td>{data.id}</td>
                                            <td>{data.meet_id}</td>
                                            <td>{data.data}</td>
                                            <td>{data.started_at}</td>
                                            <td>{data.ended_at}</td>
                                            <td>{data.duration}</td>
                                            <td>{data.subject}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ClassRecords;

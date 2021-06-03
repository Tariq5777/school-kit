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
    const [selectedSubject, setSelectedSubject]= useState("");
    const [selectedStandard, setSelectedStandard]= useState(0);
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
            "standard": selectedStandard,
            "section" : selectedSubject
        }
        axios.get(`http://localhost:7000/extra/classrecord/standard/`,data, config)
        .then(res =>{
            setClassRecord(res.data);
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err.message);
        })
    }, [sid])

    useEffect(() => {
        axios.get("http://localhost:7000/api/standard/", config).then((res) => {
            setStandard(res.data);
            console.log(standard);
        });
        axios.get("api/subjects/", config).then((res) => setSubjects(res.data));
    }, []);


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
                                        onSelect={() =>{
                                            setDropdownStandard(
                                                std.standard + " " + std.section
                                            );
                                            setSelectedStandard(std.standard);
                                        }
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
                                onSelect={(e)=>setSelectedSubject(e)}
                            >
                                {subjects.map((subject) => {
                                    <Dropdown.Item
                                        key={subject["id"]}
                                        eventKey={subject["id"]}
                                        value={subject["id"]}
                                        onSelect={() =>
                                            setDropdownSubject(subject.subject)
                                        }
                                    >
                                        {subject["subject"]}
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
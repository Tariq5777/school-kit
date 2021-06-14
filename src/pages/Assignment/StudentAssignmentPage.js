import { Container } from "@material-ui/core";
import { useState } from "react";
import {
    Table,
    Card,
    Col,
    Dropdown,
    DropdownButton,
    Row,
    Accordion,
} from "react-bootstrap";

const StudentAssignmentPage = () => {
    const [assignmentData, setAssignmentData] = useState([
        {
            title: "Assignment 1",
            date: Date(),
            due_date: Date(),
            max_points: 0,
            is_evaluated: false,
            score: 0,
            is_submitted: false,
        },
        {
            title: "Assignment 2",
            date: Date(),
            due_date: Date(),
            max_points: 0,
            is_evaluated: true,
            score: 0,
            is_submitted: true,
        },
        {
            title: "Assignment 3",
            date: Date(),
            due_date: Date(),
            max_points: 0,
            is_evaluated: true,
            score: 0,
            is_submitted: false,
        },
    ]);

    let pending = assignmentData.filter(function (e) {
        return e.is_submitted === false;
    });
    let completed = assignmentData.filter(function (e) {
        return e.is_submitted === true;
    });

    return (
        <Container>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Pending
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        {[
                                            "Title",
                                            "Date",
                                            "Due Date",
                                            "Max Points",
                                            "Is Evaluated",
                                            "Score",
                                            "Submitted",
                                        ].map((text) => (
                                            <th>{text}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pending.map((data, key)=>(
                                        <tr key = {key}>
                                            <td>{data.title}</td>
                                            <td>{data.date}</td>
                                            <td>{data.due_date}</td>
                                            <td>{data.max_points}</td>
                                            <td>{data.is_evaluated}</td>
                                            <td>{data.score}</td>
                                            <td>{data.is_submitted}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Completed
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                        <Table responsive hover>
                                <thead>
                                    <tr>
                                        {[
                                            "Title",
                                            "Date",
                                            "Due Date",
                                            "Max Points",
                                            "Is Evaluated",
                                            "Score",
                                            "Submitted",
                                        ].map((text) => (
                                            <th>{text}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {completed.map((data, key)=>(
                                        <tr key = {key}>
                                            <td>{data.title}</td>
                                            <td>{data.date}</td>
                                            <td>{data.due_date}</td>
                                            <td>{data.max_points}</td>
                                            <td>{data.is_evaluated}</td>
                                            <td>{data.score}</td>
                                            <td>{data.is_submitted}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Container>
    );
};

export default StudentAssignmentPage;

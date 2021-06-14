import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { useState } from "react";
import {
    Table,
    Button,
    Card,
    Accordion,
} from "react-bootstrap";

const EvaluateAssignment = () => {
    
    const [assignmentData, setAssignmentData] = useState([
        {
            student_name:"Tariq",
            title: "Assignment 1",
            date: Date(),
            due_date: Date(),
            submitted_on:Date(),
            max_points: 100,
            is_evaluated: false,
            score: 0,
        },
        {
            student_name:"Tariq 2",
            title: "Assignment 1",
            date: Date(),
            due_date: Date(),
            submitted_on:Date(),
            max_points: 100,
            is_evaluated: false,
            score: 0,
        },
        {
            student_name:"Tariq 3",
            title: "Assignment 1",
            date: Date(),
            due_date: Date(),
            submitted_on:Date(),
            max_points: 100,
            is_evaluated: false,
            score: 0,
        },
        {
            student_name:"Tariq 4",
            title: "Assignment 1",
            date: Date(),
            due_date: Date(),
            submitted_on:Date(),
            max_points: 100,
            is_evaluated: true,
            score: 87,
        },
    ]);

    let unChecked = assignmentData.filter(function (e) {
        return e.is_evaluated === false;
    });
    let checked = assignmentData.filter(function (e) {
        return e.is_evaluated === true;
    });

    return (
        <Container>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <Typography variant="h4">
                        To Evaluate : 
                        </Typography>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <Table responsive hover>
                                <thead>
                                    <tr>
                                        {[
                                            "Student Name",
                                            "Title",
                                            "Date",
                                            "Due Date",
                                            "Submitted On",
                                            "Is Evaluated",
                                            "Score",
                                        ].map((text) => (
                                            <th>{text}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {unChecked.map((data, key)=>(
                                        <tr key = {key}>
                                            <td>{data.student_name}</td>
                                            <td>{data.title}</td>
                                            <td>{data.date}</td>
                                            <td>{data.due_date}</td>
                                            <td>{data.submitted_on}</td>
                                            <td>
                                                <Button>Evaluate</Button>
                                            </td>
                                            <td>
                                                <Button>Mark</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        <Typography variant="h4">
                        Evaluated : 
                        </Typography>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                        <Table responsive hover>
                                <thead>
                                    <tr>
                                        {[
                                            "Student Name",
                                            "Title",
                                            "Date",
                                            "Due Date",
                                            "Submitted On",
                                            "Score",
                                            "Review",
                                        ].map((text) => (
                                            <th>{text}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {checked.map((data, key)=>(
                                        <tr key = {key}>
                                            <td>{data.student_name}</td>
                                            <td>{data.title}</td>
                                            <td>{data.date}</td>
                                            <td>{data.due_date}</td>
                                            <td>{data.submitted_on}</td>
                                            <td> 
                                                <Typography variant ="h6">{data.score}</Typography>
                                            </td>
                                            <td><Button>Review</Button></td>
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

export default EvaluateAssignment;

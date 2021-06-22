import { Container } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import { Button, Row, Col, Card, DropdownButton, Table } from "react-bootstrap";
import { isAuthenticated } from "../../helper/auth/authUtils";
import { Typography } from "@material-ui/core";

const TeacherResultPage = () => {
    const [standard, setStandard] = useState([]);
    const [selectedStandard, setSelectedStandard] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [dropdownTitle, setDropdownTitle] = useState("Select Standard");
    const [results, setResults] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${isAuthenticated().token}`,
        },
    };

    useEffect(() => {
        const get_standard = () => {
            axios
                .get("api/standard/", config)
                .then(res => setStandard(res.data))
                .catch(err => console.log(err.message));
        };
        get_standard();
    }, []);

    useEffect(() => {
        if (selectedStandard === "" && selectedSection === "") { return }
        else {
            axios
                .get(`api/marks/?standard=${selectedStandard}&section=${selectedSection}`, config)
                .then(res => setResults(res.data))
                .catch(err => console.log(err.message))
        }
    }, [selectedStandard])

    return (
        <Container>
            <Card>
                <Card.Header>

                    <Row className="mx-2 my-2">
                        <Col>
                            <Typography variant="h4" >
                                Select Standard

                            </Typography>
                        </Col>
                        <Col>
                            <DropdownButton title={dropdownTitle}>
                                {standard.map((std) => (
                                    <Dropdown.Item
                                        value={std.standard + " " + std.section}
                                        eventKey={std.id}
                                        onSelect={(e) => {
                                            setDropdownTitle(
                                                std.standard + " " + std.section
                                            );
                                            setSelectedStandard(std.standard);
                                            setSelectedSection(std.section);
                                        }}
                                    >
                                        {std.standard + " " + std.section}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </Col>
                    </Row>
                </Card.Header>
                <Row>
                    <Col>
                        <Table hover responsive striped bordered>
                            <thead>
                                <tr>
                                    {["Full Name", "First Term", "Second Term", "Total", "Standard"].map((text) => (
                                        <td key={text}>
                                            {text}
                                        </td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((data, key) => (
                                    <tr key={key}>
                                        <td>{data.full_name}</td>
                                        <td>{data.first_term}</td>
                                        <td>{data.second_term}</td>
                                        <td>{data.total}</td>
                                        <td>{data.standard}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default TeacherResultPage;

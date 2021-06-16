import { Container } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import { Button, Row, Col, Card, DropdownButton, Table } from "react-bootstrap";
import { isAuthenticated } from "../../helper/auth/authUtils";

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
                .then((res) => {
                    setStandard(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        };
        get_standard();
    }, []);

    useEffect(() => {
        axios
            .get(`api/marks/?standard=${selectedStandard}&section=${selectedSection}`, config)
            .then(res => {
                setResults(res.data);
                console.log(res.data)
            })
            .catch(err => { console.log(err.message) })
    }, [selectedStandard])

    return (
        <Container>
            <Card>
                <Row>
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
                <Row>
                    <Col>
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <td>

                                    </td>
                                </tr>
                            </thead>
                        </Table>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default TeacherResultPage;

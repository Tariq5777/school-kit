import { Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Button,
    Table,
    Dropdown,
    DropdownButton,
    Row,
    Col,
    Container,
} from "react-bootstrap";
import Timetable from "../../components/Timetable";
import { isAuthenticated } from "../../helper/auth/authUtils";

const UpdateTimetable = () => {
    const [timetable, setTimetable] = useState({});
    const [sid, setSID] = useState(0);
    const [standard, setStandard] = useState([]);
    const [subjects, setSubject] = useState([]);
    const [isPending, setIsPending] = useState(true);

    const [dropdownTitle, setDropdownTitle] = useState("Select Standard");

    const schedule = [
        "8:00 - 9:00",
        "9:00 - 10:00",
        "10:00 - 11:00",
        "11:00-12:00",
        "12:00-1:00",
        "1:00-2:00",
        "2:00-3:00",
        "3:00-4:00",
    ];
    const config = {
        headers: {
            Authorization: `Bearer ${isAuthenticated().token}`,
        },
    };

    useEffect(() => {
        axios
            .get(`http://localhost:7000/extra/timetable/${sid}`, config)
            .then((res) => {
                setTimetable(res.data.timetable);
                setIsPending(false);
                console.log(timetable);
            })
            .catch((err) => console.log(err.message));
    }, [sid]);

    useEffect(() => {
        axios.get("http://localhost:7000/api/standard/", config).then((res) => {
            setStandard(res.data);
            console.log(standard);
        });
        axios.get("api/subjects/", config).then((res) => setSubject(res.data));
    }, []);

    const updateTimetable = (e) => {
        e.preventDefault();
        const data = {
            timetable: timetable,
        };
        axios
            .put(`http://localhost:7000/extra/timetable/${sid}`, data, config)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    return (
        <Container>
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
                                    setSID(std.id);
                                }}
                            >
                                {std.standard + " " + std.section}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Col>
                <Col>
                    <Button className="mx-3" variant="success">
                        Update
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {!isPending && (
                        <Table
                            striped
                            responsive
                            bordered
                            hover
                            style={{ marginTop: "1rem" }}
                        >
                            <thead>
                                <tr>
                                    {schedule.map((sch, index) => (
                                        <th key={index}>{sch}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(timetable).map((row) => (
                                    <tr key={row[0]}>
                                        {Object.entries(timetable[row[0]]).map(
                                            (col, index) => (
                                                <td key={index}>
                                                    {/*console.log(timetable[row[0]][col[0]])*/}
                                                    <select
                                                        key={col[0]}
                                                        onChange={(e) => {
                                                            var tt = {
                                                                ...timetable,
                                                            };
                                                            tt[row[0]][col[0]] =
                                                                e.target.value;
                                                            setTimetable({
                                                                ...tt,
                                                            });
                                                        }}
                                                        className="form-select form-select-lg mb-3"
                                                    >
                                                        {subjects.map(
                                                            (subject) => (
                                                                <option
                                                                    value={
                                                                        subject.subject
                                                                    }
                                                                >
                                                                    {
                                                                        subject.subject
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </td>
                                            )
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    {!isPending && (
                        <Timetable timetable={timetable} schedule={schedule} />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateTimetable;

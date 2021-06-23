import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Container,
    DropdownButton,
    Row,
    Col,
    Dropdown,
    Card,
} from "react-bootstrap";
import Timetable from "../../components/Timetable";
import { isAuthenticated } from "../../helper/auth/authUtils";

const TimeTablePage = () => {
    const [timetable, setTimetable] = useState({});
    const [isPending, setIsPending] = useState(true);
    const [standard, setStandard] = useState([]);
    const [sid, setSID] = useState(0);
    const [dropdownTitle, setDropdownTitle] = useState("Select Standard");
    const userType = isAuthenticated().user_type;

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
        if (userType === 1) {
            axios.get("user/timetable/", config).then((res) => {
                setTimetable(res.data.timetable);
                setIsPending(false);
            })
                .catch((err) => console.log(err.message));
        } else {
            axios
                .get(`extra/timetable/${sid}`, config)
                .then((res) => {
                    setTimetable(res.data.timetable);
                    setIsPending(false);
                    console.log(timetable);
                })
                .catch((err) => console.log(err.message));
        }
    }, [sid]);


    useEffect(() => {
        if (userType === 2) {
            axios
                .get("api/standard", config)
                .then(res => setStandard(res.data))
                .catch(err => console.log(err.message));
        }

    }, []);

    document.title = "TimeTable";

    return (
        <Container>
            {userType === 2 && (
                <Card>
                    {userType === 2 && <Card.Header>Get TimeTable</Card.Header>}
                    <Card.Body>
                        <Row>
                            <Col>
                                <DropdownButton
                                    title={dropdownTitle}
                                    onSelect={(e) => setSID(e)}
                                >
                                    {standard.map((num) => (
                                        <Dropdown.Item
                                            key={num.id}
                                            eventKey={num.id}
                                            onSelect={() =>
                                                setDropdownTitle(
                                                    num.standard +
                                                    " " +
                                                    num.section
                                                )
                                            }
                                        >
                                            {num.standard + " " + num.section}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}
            {!isPending && (
                <Timetable timetable={timetable} schedule={schedule} />
            )}
        </Container>
    );
};

export default TimeTablePage;

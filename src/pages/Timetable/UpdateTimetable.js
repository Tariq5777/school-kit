import axios from "axios";
import { useEffect, useState } from "react";
import {
    Button,
    Dropdown,
    DropdownButton,
    Table,
    Row,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
} from "react-bootstrap";
import Timetable from "../../components/Timetable";
import { isAuthenticated } from "../../helper/auth/authUtils";

const UpdateTimetable = () => {
    const [timetable, setTimetable] = useState({});
    const [standard, setStandard] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [section, setSection] = useState("");

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
        headers: { Authorization: `Bearer ${isAuthenticated().token}` },
    };

    useEffect(() => {
        const data = { standard: 1, section: "A" };
        axios
            .get("http://localhost:7000/extra/timetable/",config)
            .then((res) => {
                setTimetable(res.data.timetable);
                setIsPending(false);
                console.log(timetable);
            })
            .catch((err) => console.log(err.message));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:7000/api/standard/", config).then((res) => {
            setStandard(res.data);
            console.log(standard);
        });
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <DropdownButton title={dropdownTitle}>
                        {standard.map((std, key) => (
                            <Dropdown.Item
                                value={std.standard + " " + std.section}
                                key={key}
                                onSelect={(e) =>
                                    setDropdownTitle(
                                        std.standard + " " + std.section
                                    )
                                }
                            >
                                {std.standard + " " + std.section}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                {!isPending && (
                    <Timetable timetable={timetable} schedule={schedule} />
                )}
            </Row>
        </Container>
    );
};

export default UpdateTimetable;

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
import 'bootstrap/dist/css/bootstrap.min.css';

const AddTimetable = () => {

    const [timetable, setTimetable] = useState({
        0: { 1: "-", 2: "-", 3: "-", 4: "-", 5: "-", 6: "-", 7: "-", 8: "-" },
        1: { 1: "-", 2: "-", 3: "-", 4: "-", 5: "-", 6: "-", 7: "-", 8: "-" },
        2: { 1: "-", 2: "-", 3: "-", 4: "-", 5: "-", 6: "-", 7: "-", 8: "-" },
        3: { 1: "-", 2: "-", 3: "-", 4: "-", 5: "-", 6: "-", 7: "-", 8: "-" },
        4: { 1: "-", 2: "-", 3: "-", 4: "-", 5: "-", 6: "-", 7: "-", 8: "-" },
    });
    const [ttStandard, setTTStandard] = useState(0)
    const [standard, setStandard] = useState([])
    const [subjects, setSubject] = useState([])
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
    const [dropdownTitle, setDropdownTitle] = useState("Select Standard")

    const config = { headers: { Authorization: `Bearer ${isAuthenticated().token}` } }

    const addTimetable = (e) => {
        e.preventDefault()
        const data = {
            standard: standard,
            timetable: timetable
        }
        //TODO: SEND POST REQUEST TO ADD TIMETABLE

    }

    useEffect(() => {
        get_standard()
        get_subject()
    }, [])

    const get_standard = () => {
        axios.get("api/standard/", config).then(res =>
            setStandard(res.data))
    }

    const get_subject = () => {
        axios.get("api/subjects/", config).then(res =>
            setSubject(res.data))
    }

    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => { console.log(timetable) }, [timetable])


    return (
        <div>
            <Container>
                <Row style={{ marginTop: "10%" }}>
                    <Col>
                        <DropdownButton
                            title={dropdownTitle}
                            onSelect={(e) => setTTStandard(e)}>
                            {standard.map(num =>
                                <Dropdown.Item
                                    key={num.id}

                                    eventKey={num.id}
                                    onSelect={() => setDropdownTitle(num.standard + " " + num.section)}
                                >
                                    {num.standard + " " + num.section}
                                </Dropdown.Item>
                            )}
                        </DropdownButton>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-4"><p className="text-danger font-weight-bold">"- for FREE PERIOD"</p></Col></Row>
                <Row>
                    <Col xs={12}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    {schedule.map((sch, index) => <th key={index}>{sch}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(timetable).map(row =>
                                    <tr key={row[0]}>
                                        {Object.entries(timetable[row[0]]).map((col, index) =>
                                            <td key={index}>
                                                {/*console.log(timetable[row[0]][col[0]])*/}
                                                <select
                                                    key={col[0]}
                                                    onChange={(e) => {
                                                        var tt = { ...timetable }
                                                        tt[row[0]][col[0]] = e.target.value
                                                        setTimetable({ ...tt })
                                                    }}
                                                    className="form-select form-select-lg mb-3">
                                                    {subjects.map(subject =>
                                                        <option value={subject.subject}>{subject.subject}</option>
                                                    )}
                                                </select>
                                            </td>
                                        )}
                                    </tr>
                                )}

                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="flex-row-reverse">
                    <Button className="mx-3" variant="success" onClick={() => setIsComplete(true)}>Create TimeTable</Button>
                </Row>
            </Container>
        </div>
    )
}

export default AddTimetable;

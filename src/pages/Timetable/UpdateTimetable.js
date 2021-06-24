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

const footer_styles=`
.makeStyles-footer-13{
    position:relative !important;
    margin-top:95vh;
    margin-bottom:0;
}
.form-select.form-select-lg.mb-3{
    border:none;
    padding:3px;
}
`;

const UpdateTimetable = () => {
    const [timetable, setTimetable] = useState({});
    const [sid, setSID] = useState(0);
    const [standard, setStandard] = useState([]);
    const [subjects, setSubject] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [timetable_not_null, setTimetableValue]=useState(false);
    const [dropdownTitle, setDropdownTitle] = useState("Select Standard");
    const [status_message, setStatusMessage] = useState("");
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

    // const update=(e)=>{
    //     e.preventDefault();
    //     const data = {
    //         standard: sid,
    //         timetable: timetable
    //     }
    //     axios.post(`extra/timetable/`, data, config)
    //     .then((res) => {
    //         console.log(res.data);
    //         setStatusMessage("Timetable updated Successfully!");
    //     })
    //     .catch((err) => {
    //         console.log(err.message);
    //     })
    // }
    var alert_css={};
    useEffect(() => {
       if(sid!=0){
        axios
        .get(`extra/timetable/${sid}`, config)
        .then(res => {
            if(res.data.timetable!==null && res.data.timetable!==undefined){
                setTimetable(res.data.timetable);
                setTimetableValue(true);
                setIsPending(false);
                setStatusMessage("Timetable found!");
               
            }})
        .catch(
            err => {
                console.log(err.message);
                setTimetable({});
                setIsPending(true);
                setTimetableValue(false);
                setStatusMessage("An error occured. Try again!")
                
        })
    }
    }, [sid]);

    useEffect(() => {
        axios.get("api/standard/", config).then(res => setStandard(res.data));
        axios.get("api/subjects/", config).then(res => setSubject(res.data));
    }, []);


    // Use This function for update time table

    const updateTimetable = (e) => {
        e.preventDefault();
        const data = {
            timetable: timetable,
        };
        axios
            .put(`http://localhost:7000/extra/timetable/${sid}/`, data, config)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    return (
        <Container>
            <h1>Update Timetable</h1>
            <p>Choose a standard and update the time table. After update, click on the Update button.</p>
            <p style={{color:timetable_not_null?"darkgreen":"red", fontSize:"16px", fontWeight:"bold"}}>{status_message}</p>
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
                    {timetable_not_null && <Button onClick={updateTimetable} className="mx-3" variant="success">
                        Update
                    </Button>}
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
                                                                    selected={subject.subject==col[1]}
                                                                >
                                                                    {
                                                                        subject["subject"]
                                                                        // col[1]
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
            <style>{footer_styles}</style>
        </Container>
    );
};

export default UpdateTimetable;

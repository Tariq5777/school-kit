import { Container, Grid, Paper } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Timetable from "../../components/Timetable";
import { isAuthenticated } from "../../helper/auth/authUtils";

const AddTimetable = () => {
    const [timetable, setTimetable] = useState({});
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

    const [standard, setStandard] = useState([
        { id: 1, standard: 0, section: "" },
    ]);

    useEffect(() => {
        axios
            .get("http://localhost:7000/api/standard/18", {
                headers: { Authorization: `Bearer ${isAuthenticated().token}` },
            })
            .then((res) => {
                setStandard(res.data.timetable);
                console.log(standard);
            });
    }, []);

    return (
        <div>
            <Grid
                container
                style={{
                    padding: "1rem",
                    margin: "1rem",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <Grid item>
                    <Dropdown
                        style={{
                            top: 0,
                            overflow: "unset",
                            background: "none",
                            border: 0,
                            width: "inherit",
                            right: "0px",
                        }}
                    >
                        <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                        >
                            SELECT
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                                Action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                                Something else
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid>
                <Grid item>
                    <Button variant="secondary">Update</Button>
                </Grid>
            </Grid>
            <Timetable timetable={timetable} schedule={schedule} />
        </div>
    );
};

export default AddTimetable;

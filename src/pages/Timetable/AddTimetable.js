import { Container, Grid, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Button,
    Dropdown,
    Form,
    FormControl,
    InputGroup,
} from "react-bootstrap";
import Timetable from "../../components/Timetable";
import { isAuthenticated } from "../../helper/auth/authUtils";

const AddTimetable = () => {
    const [timetable, setTimetable] = useState({
        standard: 0,
        section: "",
        timetable: {
            0: {
                1: "MONDAY",
                2: "",
                3: "",
                4: "",
                5: "",
                6: "",
                7: "",
                8: "",
            },
            1: {
                1: "TUESDAY",
                2: "",
                3: "",
                4: "",
                5: "",
                6: "",
                7: "",
                8: "",
            },
            2: {
                1: "WEDNESDAY",
                2: "",
                3: "",
                4: "",
                5: "",
                6: "",
                7: "",
                8: "",
            },
            3: {
                1: "THURSDAY",
                2: "",
                3: "",
                4: "",
                5: "",
                6: "",
                7: "",
                8: "",
            },
            4: {
                1: "FRIDAY",
                2: "",
                3: "",
                4: "",
                5: "",
                6: "",
                7: "",
                8: "",
            },
            5: {
                1: "SATURDAY",
                2: "",
                3: "",
                4: "",
                5: "",
                6: "",
                7: "",
                8: "",
            },
        },
    });
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

    const [isComplete, setIsComplete] = useState(false);

    

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
                <Grid item style={{ display: "flex", margin: "1rem" }}>
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
                            SELECT Standard
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, key) => (
                                <Dropdown.Item
                                    key={key}
                                    onChange={() =>
                                        (timetable.standard = { num })
                                    }
                                >
                                    {num}{" "}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
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
                            SELECT Section
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {["A", "B", "C"].map((text, key) => (
                                <Dropdown.Item
                                    key={key}
                                    onChange={() =>
                                        (timetable.section = { text })
                                    }
                                >
                                    {text}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid>
                <Grid item>
                    <Button variant="secondary" onClick={() => setIsComplete(true)}>Add</Button>
                </Grid>
            </Grid>
            {isComplete && (
                <Timetable timetable={timetable} schedule={schedule} />
            )}
        </div>
    );
};

export default AddTimetable;

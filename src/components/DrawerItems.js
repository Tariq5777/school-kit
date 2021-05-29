import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    Button,
    ListItemText,
} from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import TableChartIcon from "@material-ui/icons/TableChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BarChartIcon from "@material-ui/icons/BarChart";
import SchoolIcon from "@material-ui/icons/School";
import InputIcon from "@material-ui/icons/Input";
import AddIcon from "@material-ui/icons/Add";
import ClassRoundedIcon from "@material-ui/icons/ClassRounded";
import { Link, Redirect, useHistory } from "react-router-dom";
import GetAppIcon from "@material-ui/icons/GetApp";
import React, { useState } from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

const DrawerItems = ({ userType }) => {
    // userType = 2;

    let history = useHistory();

    const [timeTableopen, setTimeTableOpen] = useState(false);
    const [classDrop, setClassDrop] = useState(false);

    const studentDrawer = [
        { title: "Dashboard", link: "dashboard", icon: <HomeRoundedIcon /> },
        { title: "Timetable", link: "timetable", icon: <TableChartIcon /> },
        {
            title: "Submit Assignment",
            link: "assignment",
            icon: <AssignmentIcon />,
        },
        {
            title: "Check Attendance",
            link: "attendance",
            icon: <BarChartIcon />,
        },
        { title: "Result", link: "result", icon: <SchoolIcon /> },
        { title: "Send Query", link: "query", icon: <AddIcon /> },
        { title: "Download Extension", link: "download", icon: <GetAppIcon /> },
    ];

    const teacherDrawer = [
        { title: "Dashboard", link: "dashboard", icon: <HomeRoundedIcon /> },
        { title: "Timetable", icon: <TableChartIcon /> },
        { title: "Classes", icon: <ClassRoundedIcon /> },
        {
            title: "Check Attendance",
            link: "attendance",
            icon: <BarChartIcon />,
        },
        { title: "Download Extension", link: "download", icon: <GetAppIcon /> },
    ];

    const dropItems = {
        Timetable: [
            { title: "Add", link: "add" },
            { title: "Update", link: "update" },
            { title: "View", link: "view" },
        ],
        Classes: [
            { title: "Transcript", link: "transcript" },
            { title: "Summary", link: "summary" },
        ],
    };

    return (
        <div>
            {userType === 1 && (
                <List>
                    {studentDrawer.map((data, key) => (
                        <ListItem
                            key={key}
                            button
                            divider
                            onClick={() => history.push(data.link)}
                        >
                            <ListItemIcon>{data.icon}</ListItemIcon>
                            <ListItemText primary={data.title} />
                        </ListItem>
                    ))}
                </List>
            )}
            {userType === 2 && (
                <List>
                    {teacherDrawer.map((data, key) => (
                        <ListItem
                            key={key}
                            button
                            divider
                            onClick={() => history.push(data.link)}
                        >
                            <ListItemIcon>{data.icon}</ListItemIcon>
                            <ListItemText primary={data.title} />
                            {data.title == "Timetable" && (
                                <Button
                                    onClick={() =>
                                        setTimeTableOpen(!timeTableopen)
                                    }
                                >
                                    <ExpandMore />
                                </Button>
                            )}
                            {data.title == "Classes" && (
                                <Button
                                    onClick={() => setClassDrop(!classDrop)}
                                >
                                    <ExpandMore />
                                </Button>
                            )}
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default DrawerItems;

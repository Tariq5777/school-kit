import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import TableChartIcon from "@material-ui/icons/TableChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BarChartIcon from "@material-ui/icons/BarChart";
import SchoolIcon from "@material-ui/icons/School";
import AddIcon from "@material-ui/icons/Add";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function DrawerItems2({ userType }) {
    let history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [timeTable, setTimeTable] = useState(false);
    // const [classesOpen,setClassesOpen] = useState(false);
    const [attendance, setAttendance] = useState(false);

    const handleTimeTable = () => {
        setTimeTable(!timeTable);
    };
    const handleClick = () => {
        setOpen(!open);
    };
    const handleAttendance = () => {
        setAttendance(!attendance);
    };

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
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    <ListItem button onClick={() => history.push("/dashboard")}>
                        <ListItemIcon>
                            <HomeRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>

                    <ListItem button onClick={handleTimeTable}>
                        <ListItemIcon>
                            <TableChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Timetable" />
                        {timeTable ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={timeTable} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} onClick={() => history.push("/add-timetable")}>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Add" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => history.push("/update-timetable")}>
                                <ListItemIcon>
                                    <AddBoxOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Update" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => history.push("/timetable")}>
                                <ListItemIcon>
                                    <VisibilityOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="View" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <ClassOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Classes" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} onClick={() => history.push("/class-records")}>
                                <ListItemIcon>
                                    <ReceiptOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Class Records" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => history.push("/meet-summary")}>
                                <ListItemIcon>
                                    <ListOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Transcript and Summary" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={handleAttendance}>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Attendance" />
                        {attendance ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={attendance} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <VisibilityOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="View Attendance" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            )}
        </div>
    );
}

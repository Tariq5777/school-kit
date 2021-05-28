import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import TableChartIcon from "@material-ui/icons/TableChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BarChartIcon from "@material-ui/icons/BarChart";
import SchoolIcon from "@material-ui/icons/School";
import InputIcon from "@material-ui/icons/Input";
import AddIcon from "@material-ui/icons/Add";
import ClassRoundedIcon from "@material-ui/icons/ClassRounded";
import { Link, Redirect, useHistory } from "react-router-dom";
import GetAppIcon from '@material-ui/icons/GetApp';
import React from "react";

const DrawerItems = ({ userType }) => {
    // userType =2;

    let history = useHistory()

    const studentDrawer = [
        { title: "Dashboard", link: "dashboard", icon: <HomeRoundedIcon /> },
        { title: "Timetable", link: "timetable", icon: <TableChartIcon /> },
        { title: "Submit Assignment", link: "assignment", icon: <AssignmentIcon /> },
        { title: "Check Attendance", link: "attendance", icon: <BarChartIcon /> },
        { title: "Result", link: "result", icon: <SchoolIcon /> },
        { title: "Send Query", link: "query", icon: <AddIcon /> },
        {title:"Download Extension", link:"download", icon:<GetAppIcon/>}
    ]

    const teacherDrawer = [
        { title: "Dashboard", link: "dashboard", icon: <HomeRoundedIcon /> },
        { title: "Timetable", link: "timetable", icon: <TableChartIcon />, subItems:{
            add:{title:"Add",link:"add"},
            update:{title:"Update",link:"update"},
            view:{title:"View", link:"view"}
        } },
        { title: "Classes", link: "classes", icon: <ClassRoundedIcon />, subItems: {
            transcript:{title:"Transcript",link:"transcript"},
            summary:{title:"Summary",link:"summary"},
        } },
        { title: "Check Attendance", link: "attendance", icon: <BarChartIcon /> },
        { title:"Download Extension", link:"download", icon:<GetAppIcon/>}
    ]

    return (
        <div>
            {userType === 1 && (
                <List>
                    {studentDrawer.map((data, key) =>
                        <ListItem key={key} button divider onClick={() => history.push(data.link)}>
                            <ListItemIcon>{data.icon}</ListItemIcon>
                            <ListItemText primary={data.title} />
                        </ListItem>
                    )}
                </List>
            )}
            {userType === 2 && (
                <List>
                    {teacherDrawer.map((data, key) => 
                    <ListItem key={key} button divider onClick={()=>history.push(data.link)}>
                        <ListItemIcon>{data.icon}</ListItemIcon>
                        <ListItemText primary={data.title} />
                    </ListItem>
                    )}
                </List>
            )}
        </div>
    );
};

export default DrawerItems;

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import TableChartIcon from "@material-ui/icons/TableChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BarChartIcon from "@material-ui/icons/BarChart";
import SchoolIcon from "@material-ui/icons/School";
import InputIcon from "@material-ui/icons/Input";
import AddIcon from "@material-ui/icons/Add";
import ClassRoundedIcon from "@material-ui/icons/ClassRounded";

const DrawerItems = ({ userType }) => {
    return (
        <div>
            {userType === 1 && (
                <List>
                    {[
                        "Dashboard",
                        "Timetable",
                        "Submit Assignment",
                        "Check Attendance",
                        "Result",
                        "Send Query",
                    ].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index === 0 && <HomeRoundedIcon />}
                                {index === 1 && <TableChartIcon />}
                                {index === 2 && <AssignmentIcon />}
                                {index === 3 && <BarChartIcon />}
                                {index === 4 && <SchoolIcon />}
                                {index === 5 && <AddIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            )}
            {userType === 2 && (
                <List>
                    {["Dashboard", "Timetable", "Classes", "Attendance"].map(
                        (text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index === 0 && <HomeRoundedIcon />}
                                    {index === 1 && <TableChartIcon />}
                                    {index === 2 && <ClassRoundedIcon />}
                                    {index === 3 && <BarChartIcon />}
                                    {/* {index == 4 &&  < /> } */}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                                {index === 1 && (
                                    <List style={{ display: "block" }}>
                                        <ListItem>Add</ListItem>
                                        <ListItem>Update</ListItem>
                                        <ListItem>View</ListItem>
                                    </List>
                                )}
                                {index === 2 && (
                                    <List style={{ display: "block" }}>
                                        <ListItem>Transcript</ListItem>
                                        <ListItem>Summary</ListItem>
                                    </List>
                                )}
                            </ListItem>
                        )
                    )}
                </List>
            )}
        </div>
    );
};

export default DrawerItems;

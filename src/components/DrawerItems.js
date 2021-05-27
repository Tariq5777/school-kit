import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import TableChartIcon from "@material-ui/icons/TableChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BarChartIcon from "@material-ui/icons/BarChart";
import SchoolIcon from "@material-ui/icons/School";
import InputIcon from "@material-ui/icons/Input";
import AddIcon from "@material-ui/icons/Add";
import ClassRoundedIcon from "@material-ui/icons/ClassRounded";
import { Link } from "react-router-dom";

const DrawerItems = ({ userType }) => {
    // userType =2;
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
                            <Link to = {`/${text}`} style={{textDecoration:"none", color:"#333333"}}>
                            <ListItemText primary={text}/>
                                </Link>
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
                                <Link to = {`/${text}`} style={{textDecoration:"none", color:"#333333"}}>
                                <ListItemText primary={text} />
                                </Link>
                                {index === 1 && (
                                    <List style={{ display: "flex",flexDirection:"column" }}>
                                    {["Add", "Update", "View"].map(
                                        (text, index) =>(
                                            <ListItem button key={text}>
                                                <Link to = {`/${text}`} style={{textDecoration:"none", color:"#333333"}}>
                                                <ListItemText primary={text} />
                                                </Link>
                                            </ListItem>
                                        )
                                    )}
                                    </List>
                                )}
                                {index === 2 && (
                                    <List style={{ display: "block" }}>
                                       {["Transcript", "Summary"].map(
                                           (text, index)=>(
                                            <ListItem button key={text}>
                                                <Link to = {`/${text}`} style={{textDecoration:"none", color:"#333333"}}>
                                                <ListItemText primary={text} />
                                                </Link>
                                            </ListItem>

                                           ))
                                       }
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

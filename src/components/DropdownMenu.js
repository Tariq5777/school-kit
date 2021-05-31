// import { ArrowLeft, ArrowRight, SchoolRounded } from "@material-ui/icons";
import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Typography,
} from "@material-ui/core";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserStatusContext } from "../helper/UserStatusContext";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import LiveHelpRoundedIcon from "@material-ui/icons/LiveHelpRounded";
const DropdownMenu = () => {
    const { user, setUser } = useContext(UserStatusContext);
    let history = useHistory()

    const handleLogout = (e) => {
        localStorage.removeItem("userInfo");
        setUser(false);
        return <Redirect to="/" />;
    };

    const dropDownItems = [
        { title: "Profile", onClick: () => { history.push("/profile") }, icon: <AccountCircleRoundedIcon fontSize="large" /> },
        { title: "Support", onClick: () => { history.push("/support") }, icon: <LiveHelpRoundedIcon fontSize="large" /> },
        { title: "Logout", onClick: handleLogout, icon: <ExitToAppOutlinedIcon fontSize="large" /> }
    ];

    return (
        <div className="drop-items">
            <List className="menu-items">
                {dropDownItems.map((item, key) => (
                    <ListItem button key={key} onClick={item.onClick}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <Typography>{item.title}</Typography>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default DropdownMenu;

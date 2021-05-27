// import { ArrowLeft, ArrowRight, SchoolRounded } from "@material-ui/icons";
import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Typography,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserStatusContext } from "../helper/UserStatusContext";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import LiveHelpRoundedIcon from "@material-ui/icons/LiveHelpRounded";
const DropdownMenu = () => {
    const { user, setUser } = useContext(UserStatusContext);

    // const { token } = isAuthenticated();

    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // };
    const handleLogout = (e) => {
        localStorage.removeItem("userInfo");
        setUser(false);
        return <Redirect to="/" />;
    };

    return (
        <div className="dropdown">
            <List className="menu-items">
                {["Profile", "Support", "Logout"].map((text, index) => (
                    <ListItem button key={text}>

                        {index === 0 && (
                            <Link className="dropdown-links" to="/profile">
                                <ListItemIcon>
                                    <AccountCircleRoundedIcon fontSize="large" />
                                </ListItemIcon>
                                    <Typography>{text}</Typography>
                            </Link>
                        )}
                      
                        {index === 1 && (
                            <Link className="dropdown-links" to="/support">
                                <ListItemIcon>
                                    <LiveHelpRoundedIcon fontSize="large" />
                                </ListItemIcon>
                                    <Typography>{text}</Typography>
                            </Link>
                        )}
                      
                        {index === 2 && (
                            <Link className="dropdown-links"
                                onClick={handleLogout}
                            >
                                <ListItemIcon>
                                    <ExitToAppOutlinedIcon fontSize="large" />
                                </ListItemIcon>
                                    <Typography>{text}</Typography>
                            </Link>
                        )}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default DropdownMenu;

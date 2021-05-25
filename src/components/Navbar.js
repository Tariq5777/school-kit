import image from "../img/SK-logo/default-monochrome-sk.svg";
import {
    AppBar,
    List,
    ListItem,
    Toolbar,
    CssBaseline,
    IconButton,
    Button,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { isAuthenticated } from "../helper/auth/authUtils";
import { UserStatusContext } from "../helper/UserStatusContext";

const Navbar = () => {
    const { user, setUser } = useContext(UserStatusContext);

    const handleLogout = (e) => {
        localStorage.removeItem("userInfo");
        setUser(false);
        return <Redirect to="/" />;
    };
    return (
        <AppBar position="static" className="navbar">
            <Toolbar className="navbar">
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Link to="/">
                        <img
                            src={image}
                            style={{ width: "70px" }}
                            alt="school-kit-logo"
                        />
                    </Link>
                </IconButton>

                <List>
                    <ListItem>
                        <Link to="/faq" className="link">
                            <Button variant="outlined" color="secondary">
                                FAQ
                            </Button>
                        </Link>
                        <Link to="/download" className="link">
                            <Button variant="outlined" color="secondary">
                                Download Extension
                            </Button>
                        </Link>
                    </ListItem>
                </List>
                {!user && (
                    <div className="nav-links">
                        <List className="nav-items">
                            <ListItem>
                                <Link to="/login" className="link">
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                    >
                                        login
                                    </Button>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link to="/register" className="link">
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                    >
                                        register
                                    </Button>
                                </Link>
                            </ListItem>
                        </List>
                    </div>
                )}
                {user && (
                    <div>
                        <List className="nav-items">
                            <ListItem>
                                <Link
                                    to="/"
                                    onClick={handleLogout}
                                    className="link"
                                >
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                    >
                                        logout
                                    </Button>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link to="/dashboard" className="link">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                            </ListItem>
                        </List>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

import image from "../img/SK-logo/default-monochrome-sk.svg";
import {
    AppBar,
    List,
    ListItem,
    Toolbar,
    CssBaseline,
    IconButton,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { isAuthenticated } from "../helper/auth/authUtils";
import { UserStatusContext } from '../helper/UserStatusContext'

const Navbar = () => {
    const { user, setUser } = useContext(UserStatusContext);

    const handleLogout = (e) => {
        localStorage.removeItem("userInfo");
        setUser(false);
        return <Redirect to="/" />
    };
    return (
        <>
            <CssBaseline />
            <AppBar position="static" className="navbar">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Link to="/">
                            <img
                                src={image}
                                style={{ width: "70px" }}
                                alt="school-kit-logo"
                            />
                        </Link>
                    </IconButton>
                    <List className="title">
                        <ListItem>

                        </ListItem>
                    </List>
                    {!user && (
                        <div>
                            <List className="nav-items">
                                <ListItem>
                                    <Link to="/login" className="link">
                                        login
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link to="/register" className="link">
                                        register
                                    </Link>
                                </ListItem>
                            </List>
                        </div>
                    )}
                    {user && (
                        <div>
                            <List>
                                <ListItem>
                                    <Link
                                        to="/"
                                        onClick={handleLogout}
                                        className="link"
                                    >
                                        logout
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link
                                        to="/dashboard"
                                        className="link"
                                    >
                                        Dashboard
                                    </Link>
                                </ListItem>
                            </List>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;

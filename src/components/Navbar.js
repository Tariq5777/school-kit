import image from "../img/SK-logo/default-monochrome-sk.svg";
import {
    AppBar,
    List,
    ListItem,
    Avatar,
    Button,
    Toolbar,
    Typography,
    CssBaseline,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { authenticate, isAuthenticated } from "../helper/auth/authUtils";

const Navbar = () => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) {
            setUser(true);
        } else {
            setUser(false);
        }
    });
    const handleLogout = (e) => {
        localStorage.removeItem("userInfo");
    };
    return (
        <>
            <CssBaseline />
            <AppBar position="static" className="navbar">
                <Toolbar>
                    {/* <Typography className="title">
                        <Link to="/" className= "link">School Kit</Link>
                    </Typography> */}
                    <List className= "title">
                        <ListItem>
                            <Link to ="/">

                            <img
                                src={image}
                                style={{ width: "70px" }}
                                alt="school-kit-logo"
                                
                            />
                            </Link>
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
                                <listItem>
                                    <Link
                                        to="/login"
                                        onClick={handleLogout}
                                        className="link"
                                    >
                                        logout
                                    </Link>
                                </listItem>
                            </List>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;

import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import { Link, Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import image from "../img/SK-logo/default-monochrome-sk.png";
import {useContext, useState, useEffect } from "react";
import { isAuthenticated } from "../helper/auth/authUtils";
import { UserStatusContext } from "../helper/UserStatusContext";
import axios from "axios";
import DrawerItems from "./DrawerItems";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const Navbar = () => {
    const { user, setUser } = useContext(UserStatusContext);
    const [accType, setAccType] = useState({
        acc_type:0
    });

    
    const { token } = isAuthenticated();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const url = "http://localhost:7000/api/profile/";

    useEffect(() => {
        setTimeout(() => {
            axios.get(url, config)
                .then((res) => {
                    const {acc_type} = res.data;
                    setAccType({acc_type});
                    console.log(accType.acc_type);
                })  
                .catch((err) => {
                    console.log(err.message);
                });
        });
    }, []);

    if (isAuthenticated()) {
        setUser(true);
    }

    const handleLogout = (e) => {
        localStorage.removeItem("userInfo");
        setUser(false);
        return <Redirect to="/" />;
    }

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            {/* <CssBaseline /> */}
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className="navbar">
                    {user && <IconButton
                        color="secondary"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>}
                    <IconButton edge="start"  aria-label="menu"color="secondary">
                        <Link to="/">
                            <img
                                src={image}
                                style={{ width: "80px" }}
                                alt="school-kit-logo"
                            />
                        </Link>

                </IconButton>
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
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose} color="secondary">
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                    <DrawerItems userType = {accType.acc_type}/>                
                <Divider />

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
            </main>
        </div>
    );
};
export default Navbar;

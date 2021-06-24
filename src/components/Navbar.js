import React, { Profiler } from "react";
import { useContext, useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { isAuthenticated } from "../helper/auth/authUtils";
import { UserStatusContext } from "../helper/UserStatusContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import image from "../img/School-Kit-Logo.png";
import DrawerItems2 from "./DrawerItems";
import NavItems from "./NavItems";
import DropdownMenu from "./DropdownMenu";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        marginBottom: "2rem",
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
        height: "70px",
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
    const history = useHistory()

    const { token } = isAuthenticated();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        if (isAuthenticated()) {
            setUser(true);
        }
    }, []);

    const classes = useStyles();
    const theme = useTheme();
    
    // Sidebar open at login/register also fix here
    const [open, setOpen] = useState(true)

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
                    {user && (
                        <IconButton
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
                        </IconButton>
                    )}
                    <IconButton
                        edge="start"
                        aria-label="menu"
                        color="secondary"
                        onClick={() => history.push("/")}
                    >
                        <Link to="/">
                            <img
                                src={image}
                                style={{ width: "150px" }}
                                alt="school-kit-logo"
                            />
                        </Link>
                    </IconButton>
                    {!user && (
                        <div className="nav-links">
                            <List className="nav-items">
                                <ListItem>
                                    <Button onClick={() => history.push("/login")}
                                        color="secondary"
                                        variant="outlined">
                                        Login
                                        </Button>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        onClick={() => history.push("/register")}
                                        color="secondary"
                                        variant="outlined">
                                        Register
                                        </Button>
                                </ListItem>
                            </List>
                        </div>
                    )}
                    {user && (
                        <List className="nav-items">
                            <ListItem>
                                <NavItems>
                                    <DropdownMenu />
                                </NavItems>
                            </ListItem>
                        </List>
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
                <DrawerItems2 userType={isAuthenticated().user_type} />

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

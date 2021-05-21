import image from "../img/SK-logo/default-monochrome-sk.svg";
import { List, ListItem, Avatar, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helper/auth/authUtils";
import { useEffect, useState } from "react";

function Navbar() {


  return (
    <div className="navbar">
      <Link to="/">
        <img src={image} style={{ width: "70px" }} alt="school-kit-logo" />
      </Link>
      <List>
        <ListItem>
          <Link to="/login">login</Link>
        </ListItem>
        <ListItem>
          <Link to="/register">register</Link>
        </ListItem>
      </List>
    </div>
  );
}

export default Navbar;

import { Avatar } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { isAuthenticated } from "../helper/auth/authUtils";

const NavItems = (props) => {

    const [drop, setDrop] = useState(false);
    const [profile, setProfile] = useState({
        acc_type: 0,
        email: "",
        full_name: "",
        roll_no: 0,
        section: "",
        standard: 0,
        profile_img: ""
    });
    const config = {
        headers: {
            Authorization: `Bearer ${isAuthenticated().token}`,
        },
    };

    useEffect(() => {
        axios
            .get("api/profile/", config)
            .then((res) => setProfile({ ...res.data }));
    }, []);
    

    return (
        <a href="#" onClick={() => setDrop(!drop)} style={{ textDecoration: "none" }}>
            <Avatar alt="Profile Pic" src={profile.profile_img} style={{ width: "50px", height: "50px" }} />
            {drop && props.children}
        </a>
    );
}

export default NavItems;
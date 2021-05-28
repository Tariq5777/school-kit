import { Avatar } from "@material-ui/core";
import {useState } from "react";
import face4 from "../img/faces/face4.jpg";

const NavItems = (props) => {

    const [drop, setDrop] = useState(false);



    return (
        <a href="#" onClick={() => setDrop(!drop)} style={{ textDecoration: "none" }}>
            <Avatar alt="Remy Sharp" src={face4} style={{width:"50px", height:"50px"}}/>
            {drop && props.children}
        </a>
    );
}

export default NavItems;
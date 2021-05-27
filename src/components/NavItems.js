import { Avatar } from "@material-ui/core";
import { useState } from "react";

const NavItems = (props) => {

    const [drop, setDrop] = useState(false);

    return (
        <a href="#" onClick={() => setDrop(!drop)} style={{ textDecoration: "none" }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            {drop && props.children}
        </a>
    );
}

export default NavItems;
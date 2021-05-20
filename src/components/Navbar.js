import image from "../img/SK-logo/default-monochrome-sk.svg";
import { List, ListItem, Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">
      <img src={image} style={{ width: "70px" }} alt = "school-kit-logo"/>
      </Link>
      {/* <List>
        <ListItem>
          <Link to="/FAQ">
            <Button variant="outline" color="secondary" className = "btn">
              FAQ
            </Button>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/download">
            <Button variant="outline" color="primary" style = {{color:"white",fontWeight:600}} >
              Download Extension
            </Button>
          </Link>
        </ListItem>
      </List> */}
      <List>
        <ListItem>
        <Link to ="/login">login</Link>
        </ListItem>
        <ListItem>

     <Link to ="/register">register</Link>
        </ListItem>
      </List>
      {/* <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        style={{
          position: "relative",
          padding: "5px",
          margin: "5px",
          right: "5px",
        }}
      /> */}

    </div>
  );
}

export default Navbar;

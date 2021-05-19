import {Link} from'react-router-dom';
import { List, ListItem } from "@material-ui/core";
const Footer = () => {
  return (
    <div className = "footer" >
      <span>School Kit 2021</span>
      <div className="footer-items">
        <List>
          <ListItem>Important Links</ListItem>
          <ListItem>
            <Link to ="/FAQ">Frequently Asked Questions</Link>
          </ListItem>
          <ListItem>
            <Link to ="/download">Download Chrome Extension</Link>
          </ListItem>
        </List>
      </div>
    </div>
  )
}

export default Footer;




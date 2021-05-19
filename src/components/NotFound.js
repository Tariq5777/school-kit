import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>Sorry</h1>
            <h2>Page Not Found</h2>
            <Link to="/">Go back to main page</Link>
        </div>
    );
}
 
export default NotFound;
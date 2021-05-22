import Navbar from "./components/Navbar";
// import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { isAuthenticated } from "./helper/auth/authUtils";
import ForgotPassword from "./pages/ForgotPassword";



const App = () => {
    return (
        <Router>
            <Navbar />
            <main style={{ marginTop: "3rem" }}>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path = "/forgot-password">
                    <ForgotPassword/>
                </Route>
                {/* <Route path="*">
                    <NotFound />
                </Route> */}
            </main>
        <Footer />
        </Router>
    );
};

export default App;

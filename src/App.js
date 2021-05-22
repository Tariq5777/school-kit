import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import { isAuthenticated } from "./helper/auth/authUtils";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./components/Dashboard";
import LandingPage from "./pages/LandingPage";
import ChangePassword from "./pages/ChangePassword";

const App = () => {
    const baseUrl = "http://localhost:8000/api/";
    return (
        <Router>
            <Navbar />
            <main style={{ marginTop: "3rem" }}>
                <Switch>
                    <Route exact path="/">
                        <LandingPage/>
                    </Route>
                    <Route path ="/home">
                        <Home/>
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPassword />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard/>
                    </Route>
                    <Route to="/change-password" baseUrl={baseUrl}>
                        <ChangePassword/>
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </main>
            <Footer />
        </Router>
    );
};

export default App;

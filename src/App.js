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
import { useState, useMemo } from "react";
import { UserStatusContext } from './helper/UserStatusContext'

const App = () => {
    const baseUrl = "http://localhost:8000/api/";

    const [user, setUser] = useState(false)
    const value = useMemo(() => ({ user, setUser }), [user, setUser])

    return (
        <Router>
            <UserStatusContext.Provider value={value}>
                <Navbar />
            </UserStatusContext.Provider>
            <main style={{ marginTop: "3rem", height: "70vh" }}>
                <Switch>
                    <UserStatusContext.Provider value={value}>
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/home" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </UserStatusContext.Provider>
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route to="/change-password" baseUrl={baseUrl} component={ChangePassword} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </main>
            <Footer />
        </Router>
    );
};

export default App;

import Navbar from "./components/Navbar";
// import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import ChangePassword from "./pages/ChangePassword";
import { useState, useMemo } from "react";
import { UserStatusContext } from './helper/UserStatusContext';
import PrivateRoute from "./helper/auth/PrivateRoute";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Profile from "./pages/Profile";
import Query from "./pages/Query";
import TimeTablePage from "./pages/Timetable/TimeTablePage";
import AttendanceDisplayPage from "./pages/Attendance/AttendanceDisplayPage";
import MeetSummary from "./pages/MeetSummary/MeetSummary";
import Download from "./pages/Download";
import AddTimetable from "./pages/Timetable/AddTimetable";


const App = () => {

    const [user, setUser] = useState(false);
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <Router>
            <UserStatusContext.Provider value={value}>
                <Navbar />
                <main style={{ marginTop: "1rem", height: "70vh" }}>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/login" component={Login} />
                    <Route path="/download" component={Download} />
                    <Route path="/register" component={Register} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <PrivateRoute exact path="/dashboard" component={StudentDashboard} />
                    <PrivateRoute exact path="/teacher-dashboard" component={TeacherDashboard} />
                    <PrivateRoute path="/change-password" component={ChangePassword} />
                    {/* <Route path="*" component={NotFound} /> */}
                    <Route path="/add-timetable" component={AddTimetable} />
                    <PrivateRoute exact path="/timetable" component={TimeTablePage} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact path="/query" component={Query} />
                    <PrivateRoute exact path="/attendance" component={AttendanceDisplayPage} />
                    <PrivateRoute exact path="/meet-summary" component={MeetSummary} />
                </main>
            </UserStatusContext.Provider>
            <Footer />
        </Router>
    );
};

export default App;

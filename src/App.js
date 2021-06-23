import Navbar from "./components/Navbar";
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
import TeacherRoute from './helper/auth/TeacherRoute';
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Profile from "./pages/Profile";
import Query from "./pages/Query";
import TimeTablePage from "./pages/Timetable/TimeTablePage";
import AttendanceDisplayPage from "./pages/Attendance/AttendanceDisplayPage";
import MeetSummary from "./pages/MeetSummary/MeetSummary";
import Download from "./pages/Download";
import AddTimetable from "./pages/Timetable/AddTimetable";
import UpdateTimetable from "./pages/Timetable/UpdateTimetable";
import ClassRecords from "./pages/Classes/ClassRecords";
import TeacherAttendancePage from "./pages/Attendance/TeacherAttendancePage";
// import StudentAssignmentPage from "./pages/Assignment/StudentAssignmentPage";
// import EvaluateAssignment from "./pages/Assignment/EvaluateAssignment";
// import CreateAssignment from "./pages/Assignment/CreateAssignment";
import StudentResult from "./pages/Result/StudentResult";
import TeacherResultPage from "./pages/Result/TeacherResultPage";
import AddResult from "./pages/Result/AddResult";


const App = () => {

    const [user, setUser] = useState(false);
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <Router>
            <UserStatusContext.Provider value={value}>
                <Navbar />
                <main style={{ marginTop: "1rem",position:"relative" }}>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/download" component={Download} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <PrivateRoute exact path="/dashboard" component={StudentDashboard} />
                    <TeacherRoute exact path="/teacher-dashboard" component={TeacherDashboard} />
                    <PrivateRoute exact path="/change-password" component={ChangePassword} />
                    <TeacherRoute exact path="/add-timetable" component={AddTimetable} />
                    <TeacherRoute exact path="/update-timetable" component={UpdateTimetable} />
                    <PrivateRoute exact path="/timetable" component={TimeTablePage} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact path="/query" component={Query} />
                    <PrivateRoute exact path="/attendance" component={AttendanceDisplayPage} />
                    <TeacherRoute exact path="/meet-summary" component={MeetSummary} />
                    <TeacherRoute exact path="/class-records" component={ClassRecords} />
                    <PrivateRoute exact path="/students-attendance" component={TeacherAttendancePage} />
                    {/* <PrivateRoute exact path="/assignment" component={StudentAssignmentPage} />
                    <PrivateRoute exact path="/evaluate-assignment" component={EvaluateAssignment} />
                    <PrivateRoute exact path="/create-assignment" component={CreateAssignment} /> */}
                    <PrivateRoute exact path="/result" component={StudentResult} />
                    <TeacherRoute exact path="/teacher-results" component={TeacherResultPage} />
                    <TeacherRoute exact path="/add-result" component={AddResult} />

                </main>
            </UserStatusContext.Provider>
            <Footer />
        </Router>
    );
};

export default App;

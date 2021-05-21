import Navbar from "./components/Navbar";
// import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Container } from "@material-ui/core";

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ marginTop: "8rem" }}>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        {/* <Route path="*">
            <NotFound />
          </Route> */}
        {/* <Footer /> */}
      </main>
    </Router>
  );
}

export default App;

import Navbar from "./components/Navbar";
// import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Container } from "@material-ui/core";

function App() {

  const baseUrl = 'http://127.0.0.1:/';

  return (
    <Router>
      <Navbar />
      <main style={{ marginTop: "8rem" }}>

        <Route exact path="/"><Home baseUrl={baseUrl} /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/register"><Register /></Route>
        {/* <Route path="*">
            <NotFound />
          </Route> */}
        {/* <Footer /> */}
      </main>
    </Router >
  );
}

export default App;

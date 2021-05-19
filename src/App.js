import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  const baseUrl = 'http://127.0.0.1:/';

  

  return (
    <Router>
      <div className= "app">
      <Navbar />
        <Switch>
          <Route exact path="/">
            <Home baseUrl = {baseUrl} />
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      <Footer />
      </div>
    </Router>
  );
}

export default App;

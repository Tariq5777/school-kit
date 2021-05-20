import axios from "axios";
import { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import image from "../img/SK-logo/default-monochrome-sk.svg";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [standard, setStandard] = useState(0);
  const [section, setSection] = useState("");
  const [rollNo, setRollNo] = useState(0);
  const [userType, setUserType] = useState(1);

  const [registerStatus, setRegisterStatus] = useState(false);

  const handleUserType = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://127.0.0.1:8000/api/register/", {
      full_name: fullName,
      email : email,
      password: password,
      standard: standard,
      section: section,
      roll_no: rollNo,
      user_type: userType,
      standard_ids : userType === 2 ? `${standard} ${section}` : null,
    }).then(res=>{
      setRegisterStatus(true);
    });
  };

  return (
    <form className="login register" onSubmit={handleSubmit}>
      <img src={image} alt="school-kit" />
      <TextField
        type="text"
        id="outlined-basic"
        label="Full Name"
        variant="outlined"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      {/* <TextField
        type="email"
        required
        id="outlined-basic"
        label="username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /> */}
      <TextField
        type="email"
        id="outlined-basic"
        label="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        required
        id="outlined-basic"
        label="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        type="number"
        id="outlined-basic"
        label="class"
        variant="outlined"
        value={standard}
        onChange={(e) => setStandard(e.target.value)}
      />
      <TextField
        type="text"
        id="outlined-basic"
        label="section"
        variant="outlined"
        value={section}
        onChange={(e) => setSection(e.target.value)}
      />
      <TextField
        type="number"
        id="outlined-basic"
        label="Roll Number"
        variant="outlined"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />
      <div>
        <p>User Type</p>
        <label htmlFor="radio-button-demo">Student</label>
        <Radio
          checked={userType === "1"}
          onChange={handleUserType}
          value="1"
          name="radio-button-demo"
          inputProps={{ "aria-label": "A" }}
        />
        <label htmlFor="radio-button-demo">Teacher</label>
        <Radio
          checked={userType === "2"}
          onChange={handleUserType}
          value="2"
          name="radio-button-demo"
          inputProps={{ "aria-label": "B" }}
        />
      </div>
      <Button type="submit" variant="outline" color="primary">
        Register
      </Button>
      {registerStatus && <p>Register Successful</p> }
    </form>
  );
};

export default Register;


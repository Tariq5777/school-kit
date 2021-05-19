import axios from "axios";
import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import image from "../img/SK-logo/default-monochrome-sk.svg";

const Login = () => {
  // const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIyMjAyMDI3LCJqdGkiOiI2ZGRlOGYxNWU0ZTY0MjkyYTk3NDExNGRiNzRhM2Y2ZSIsInVzZXJfaWQiOjEsInVzZXJfdHlwZSI6Mn0.wNyO-c9Yfo5iMqKL08JP5C11T_pXxgI5Wf9r6zMGY5U";

  const baseUrl = '/http://127.0.0.1:8000';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginStatus,setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(baseUrl+"api/login/",{
      username:username,
      password:password,
    }).then(res=>{
      if(!res.data.message){
        setLoginStatus(res.data.message);
      }
      else{
        console.log(res.data);
        setLoginStatus(res.data[0].username)
      }
    }).catch(err=>{
      console.log(err);
    })
  };
  return (
    <form onSubmit={handleLogin} class="login">
      <img src={image} alt="school-kit" />
      <TextField 
        type = "text" 
        id="outlined-basic" 
        label="email" 
        variant="outlined" 
        value= {username} 
        onChange = {e=>setUsername(e.target.value)}/>
      <TextField 
        type = "password"
        id="outlined-basic" 
        label="password" 
        variant="outlined" 
        value= {password} 
        onChange = {e=>setPassword(e.target.value)} />
      <Button type = "submit"variant="outline" color="secondary">
        Login
      </Button>
      <p>{loginStatus}</p>
      {/* {!isPending && <button>Submit</button>}
      {isPending && <button disabled>Adding...</button>} */}
    </form>
  );
};

export default Login;

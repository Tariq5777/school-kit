import {Button} from '@material-ui/core';
// import axios from 'axios';
import { Link } from 'react-router-dom';
const Home =  ({baseUrl})=> {



  const handleClick = () => {
    // axios.get(`${baseUrl}/profile/${accesToken}`)
    // .then(function (response) {
    //   // handle success
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
  }


  return (
    <div className = "home">
     <Link to ="/login">login</Link>
     <Link to ="/register">register</Link>

    </div>
  )
}

export default Home;

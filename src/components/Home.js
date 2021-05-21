import {Button, Container} from '@material-ui/core';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home =  ( )=> {

  const [fullName, setFullName] = useState('name');
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/profile/', {
      withCredentials:true
    }).then(res=>{
      setFullName(res.full_name);  
    })
  }, [])
  return (
    <Container>
     {!isPending &&  <p>Hi </p>}
     {isPending &&  <p>Loading... </p>}
    </Container>
  )
}

export default Home;

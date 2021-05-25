import { Card, Container, Typography } from "@material-ui/core";
import {isAuthenticated} from '../helper/auth/authUtils';
import {UserStatusContext} from '../helper/UserStatusContext';
import {useContext, useState, useEffect} from 'react';
import axios from 'axios';

const Dashboard = () => {

    const [isPending, setIsPending] = useState(true);
    const { user, setUser } = useContext(UserStatusContext);
    const [profile, setProfile] = useState({
        acc_type: 0,
        email: "",
        full_name: "",
        roll_no: 0,
        section: "",
        standard: 0,
    });

    const { token } = isAuthenticated();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const url = "http://localhost:7000/api/profile/";

    useEffect(() => {
        setTimeout(() => {
            axios
                .get(url, config)
                .then((res) => {
                    const {acc_type, full_name, email,roll_no,section, standard} = res.data;
                    setProfile({acc_type, full_name, email,roll_no,section, standard});
                    console.log(profile);
                    setIsPending(false);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }, 500);
    }, []);

    if (isAuthenticated()) {
        setUser(true);
    }
  return (
      <Container maxWidth="lg" style={{marginBottom:"450px"}}>
        <Card>
          <Typography>
            asd
          </Typography>
        </Card>
      </Container>
  );
}
 
export default Dashboard;
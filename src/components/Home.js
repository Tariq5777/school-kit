import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    CssBaseline,
    Grid,
    Typography,
} from "@material-ui/core";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helper/auth/authUtils";
import { UserStatusContext } from "../helper/UserStatusContext";

const Home = () => {
    const cards = [1];
    const [fullName, setFullName] = useState("name");
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
    const url = "http://localhost:8000/api/profile/";

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
        <>
            <CssBaseline />
            <Container className="cardGrid" maxWidth="md">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="card">
                            <CardContent className="cardContent">
                                <Typography gutterBottom variant="h5">
                                    Hello {profile.full_name}
                                </Typography>
                                <Typography>
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Optio, magni placeat
                                    ducimus in, similique nemo reiciendis,
                                    maiores sunt vero voluptates illo ex
                                    necessitatibus et aliquid sit? Quis laborum
                                    aut eligendi!
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Home;

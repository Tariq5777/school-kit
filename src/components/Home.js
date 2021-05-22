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
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helper/auth/authUtils";

const Home = () => {

    const cards = [1];
    const [fullName, setFullName] = useState("name");
    const [isPending, setIsPending] = useState(true);

    const [profile, setProfile] = useState({});

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
                    setProfile(res.data);
                    setIsPending(false);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }, 500);
    });

    if (isAuthenticated()) {
        return <Redirect to="/" />
    }

    return (
        <>
            <CssBaseline />
            <Container className="cardGrid" maxWidth="md">
                <Grid container spacing={4}>
                    <Grid item /*key={card}*/ xs={12} sm={6} md={4}>
                        <Card className="card">
                            <CardMedia
                                className="cardMedia"
                                image="https://source.unsplash.com/random"
                                title="Image title"
                            />
                            <CardContent className="cardContent">
                                <Typography gutterBottom variant="h5">
                                    Heading
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
                            <CardActions>
                                <Button size="small" color="primary">
                                    View
                                </Button>
                                <Button size="small" color="primary">
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Home;

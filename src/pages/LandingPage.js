import {
    CssBaseline,
    Container,
    Typography,
    Button,
    List,
    ListItem,
} from "@material-ui/core";
import { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { isAuthenticated } from "../helper/auth/authUtils";
import { UserStatusContext } from "../helper/UserStatusContext";
import image from "../img/online-schooling.jpg";
import SchoolKitLogo from "../img/School Kit - logo/default-monochrome.png";
import ChromeIcon from "../img/google-chrome-icon.png";
// import { Link } from "react-router-dom";

const LandingPage = () => {
    const { user, setUser } = useContext(UserStatusContext);

    useEffect(() => {
        if (isAuthenticated()) {
            setUser(true);
            return <Redirect to="/dashboard" />;
        }
    }, [])


    return (
        <div>
            <CssBaseline />
            <Container className="landing-page">
                <div>
                    <img
                        src={image}
                        alt="online schooling"
                        className="landing-page-image"
                    />

                </div>
                <div className="content">
                    <img
                        src={SchoolKitLogo}
                        alt="school kit logo_old"
                        style={{ marginBottom: "10px" }}
                        className="school-kit-image"
                    />
                    <Typography variant="h6">
                        We thrive to create a Web app for the school teachers
                        and students which will provide them with an imminent
                        amount of features that can handle their study’s basic
                        needs and regularities.
                    </Typography>
                    <Button color="secondary" variant="outlined" style={{ marginTop: "2rem" }}>Learn More</Button>
                </div>
            </Container>
            <Container className="why-school-kit" maxWidth="md">
                <div className="content">
                    <Typography
                        variant="h1"
                        style={{ fontWeight: "700" }}
                    // color="textSecondary"
                    >
                        Why School Kit ?
                    </Typography>
                    <Typography variant="h5">
                        School-Kit is the only advanced way in the times of the
                        ongoing pandemic which will ensure that every student
                        connected through will receive its offering to such
                        great extents that the online and offline only become
                        mere words in the eyes of the users of the School-Kit.
                    </Typography>
                </div>
            </Container>
            <Container className="landing-page">
                <div className="chrome-text">
                    <Typography variant="h1">
                        SchoolKit Chrome Extension
                    </Typography>
                    <Typography variant="h6">
                        To make this feature happen we will be building a chrome
                        extension for extracting captions, the whole ideology of
                        this feature is based on Web Scraping and use Deep
                        Learning to generate a summary.
                    </Typography>
                </div>
                <div className="chrome-img">
                    <img
                        src={ChromeIcon}
                        alt="google chrome icon"
                        className="chrome-icon"
                    // style={{ marginBottom: "10px" }}
                    />
                </div>
            </Container>
            <Container className="why-school-kit" maxWidth="md">
                <div className="content">
                    <Typography
                        variant="h1"
                        style={{ fontWeight: "700" }}
                    //color=""
                    >
                        Get Started
                    </Typography>
                    <List >
                        <ListItem button>
                            <Typography>
                                Online Meeting Summary Generator.
                            </Typography>
                        </ListItem>
                        <ListItem button>
                            <Typography>
                                Attendance
                                (Facial recognition).
                            </Typography>
                        </ListItem>
                        <ListItem button>
                            <Typography>
                                Time Table-(Email
                                Scheduled).
                            </Typography>
                        </ListItem>
                        <ListItem button>
                            <Typography>
                                Authentication(Profile Management)
                            </Typography>
                        </ListItem>
                        <ListItem button>
                            <Typography>
                                Result Displayed(Pattern Check for uploaded
                                file, Visualization, Leaderboard).
                            </Typography>
                        </ListItem>
                        <ListItem button>
                            <Typography>
                                EssayRating(Grade marks Accordingly).
                            </Typography>
                        </ListItem>
                    </List>
                </div>
            </Container>
        </div>
    );
};

export default LandingPage;

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Divider,
    Grid,
    Typography,
} from "@material-ui/core";
import chromeLogo from "../img/google-chrome-icon.png";

const Download = () => {
    return (
        <Container maxWidth="md" className="download-extension">
            <Typography variant="h2" style={{ color: "#333333" }}>
                Download SchoolKit Chrome Extension
            </Typography>
            <Divider />
            <Grid container spacing={5}>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                To make SchoolKit we have built a chrome
                                extension for extracting captions, the whole
                                ideology of this feature is based on Web
                                Scraping and use Deep Learning to generate a
                                summary for students, that can be be accessed by
                                students after every class.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            flexFlow: "row wrap",
                        }}
                    >
                        <CardMedia>
                            <img
                                src={chromeLogo}
                                alt="chrome-logo"
                                className="chrome-icon"
                            />
                        </CardMedia>
                        <CardContent>
                            <Typography variant="h5">
                                Download Extension here
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <form method="get" action="">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Download
                                </Button>
                            </form>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Download;

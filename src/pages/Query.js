import {
    Card,
    CardActions,
    CardContent,
    Container,
    FormControl,
    TextField,
    Button,
    Typography,
} from "@material-ui/core";
import { useState } from "react";

const Query = () => {
    const [subject, setSubject] = useState("");
    const [query, setQuery] = useState("");

    const handleSendQuery = () => {};

    return (
        <Container maxWidth="sm">
            <Card>
                <CardContent>
                    <form onSubmit={handleSendQuery}>
                        <CardContent>
                            <Typography variant = "h3" style ={{ textAlign:"center"}}>
                                Submit Queries
                            </Typography>
                            <FormControl margin="normal" fullWidth={true}>
                                <TextField
                                    type="text"
                                    label="Subject"
                                    variant="outlined"
                                    required
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth={true}>
                                <TextField
                                    type="text"
                                    label="Your Query"
                                    variant="outlined"
                                    required
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <FormControl
                                fullWidth={true}
                                style={{
                                    marginLeft: "50px",
                                    marginRight: "50px",
                                }}
                            >
                                <Button
                                    style={{
                                        paddingTop: "15px",
                                        paddingBottom: "15px",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    SEND QUERY
                                </Button>
                            </FormControl>
                        </CardActions>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Query;

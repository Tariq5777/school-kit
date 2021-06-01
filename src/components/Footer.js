import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {"Copyright © "}
            <Link color="inherit" href="/">
                School Kit
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(3, 0),
        // marginTop: "100px",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <>
            {/* <CssBaseline /> */}
            <footer
                className={classes.footer}
                style={{

                    position: "relative",
                    width: "100%",
                    bottom: 0,
                    top:"auto",
                    flexShrink: 0,
                    textAlign: "center",
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="h5">School Kit</Typography>
                    <Copyright />
                </Container>
            </footer>
        </>
    );
}

import { makeStyles, Modal, Fade, Backdrop } from "@material-ui/core";
import { Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const TranscriptModal = ({ data, open, onClose }) => {
    const classes = useStyles();
    return (
        <Modal
            open={open}
            onClose={onClose}
            className={classes.modal}
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <Card
                    style={{
                        width: "80%",
                        height: "70%",
                        overflow:"scroll"
                    }}
                >
                {data.map((val, key) => (
                        <Card.Body key={key}>
                            <ListGroup>
                            <ListGroup.Item style={{fontWeight:"bold"}}>{val.timestamp}</ListGroup.Item>
                            <ListGroup.Item>{val.text}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                ))}
                </Card>
            </Fade>
        </Modal>
    );
};

export default TranscriptModal;

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // overflow:"scroll"
    },
    paper: {
        width: "70%",
        height: "80%",
        backgroundColor: theme.palette.background.paper,
        elevation: 3,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

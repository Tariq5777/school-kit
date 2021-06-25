import { makeStyles, Modal, Fade, Backdrop } from '@material-ui/core'
import { Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
const SummaryModal = ({ data, open, onClose }) => {
    const classes = useStyles();

    return (

        <Modal
            open={open}
            onClose={onClose}
            className={classes.modal}
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open} >
                <Card style={{
                    width: '80%',
                    height: '70%'
                }}>
                    <Card.Header as="h2" >{data.title}</Card.Header>
                    <Card.Body>
                        <Card.Title>ABC</Card.Title>
                        <Card.Text>
                            <h5>{data.transcript}</h5>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Fade>

        </Modal>

    )
}

export default SummaryModal

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        width: '70%',
        height: '80%',
        backgroundColor: theme.palette.background.paper,
        elevation: 3,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
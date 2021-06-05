import {
    Avatar, Backdrop, Modal, makeStyles, Container,
} from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../helper/auth/authUtils";
import face4 from "../img/faces/face4.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChangePassword from "./ChangePassword";
const Profile = () => {
    const [profile, setProfile] = useState({
        acc_type: 0,
        email: "",
        full_name: "",
        roll_no: 0,
        section: "",
        standard: 0,
    });
    const history = useHistory();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { token } = isAuthenticated();
    const [isPending, setIsPending] = useState(false);

    const classes = useStyles();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    // const handleChangePassword = (e) => {
    //     const data = new FormData();
    //     data.append("current_password", currentPassword);
    //     data.append("new_password", newPassword);

    //     e.preventDefault();
    //     axios
    //         .put("api/change_password/", data, config)
    //         .then((res) => {
    //             console.log(res.data.message);
    //             setIsPending(true);
    //             setTimeout(() => {
    //                 history.push("/dashboard");
    //             }, 1000)
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    // };
    useEffect(() => {
        axios
            .get("api/profile/", {
                headers: { Authorization: `Bearer ${isAuthenticated().token}` },
            })
            .then((res) => setProfile({ ...res.data }));
    }, []);

    const [modalOpen, setModalOpen] = useState(false);

    const handlePasswordChange = () => {

        setModalOpen(true);
    }

    const modalBody = (
        <div>

        </div>
    );

    return (
        <Container
            maxWidth="md"
            style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center" }}>
            <div className="profile-image">
                <Avatar
                    alt="Remy Sharp"
                    src={face4}
                    style={{ width: "100px", height: "100px", alignItems: "center", }}
                />
                <Card className="mt-5" style={{ width: '35rem', height: '70%' }}>
                    <Card.Header as="h5" >Profile</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control disabled value={profile.full_name} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control disabled value={profile.email} />
                            </Form.Group>
                            {profile.acc_type === 1 &&
                                <div>
                                    <Form.Group>
                                        <Form.Label>Roll No.</Form.Label>
                                        <Form.Control disabled value={profile.roll_no} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control disabled value={profile.standard} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Section</Form.Label>
                                        <Form.Control disabled value={profile.section} />
                                    </Form.Group>
                                </div>
                            }
                            <Button variant="primary" onClick={handlePasswordChange}>
                                Change Password
                          </Button>
                        </Form>
                        <Modal
                            open={modalOpen}
                            onClose={() => setModalOpen(false)}
                            className={classes.modal}
                            BackdropComponent={Backdrop}
                            BackdropProps={{ timeout: 500 }}>

                            <ChangePassword />
                        </Modal>
                    </Card.Body>

                </Card>
            </div>

        </Container >
    );
};
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

export default Profile;

import {
    Avatar,
    Button,
    Card,
    CardContent,
    Backdrop,
    Container,
    Modal,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
} from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { isAuthenticated } from "../helper/auth/authUtils";
import face4 from "../img/faces/face4.jpg";
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
    const [isPending , setIsPending] = useState(false);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const handleChangePassword = (e) => {
        const data = new FormData();
        data.append("current_password", currentPassword);
        data.append("new_password", newPassword);

        e.preventDefault();
        axios
            .put("api/change_password/", data, config)
            .then((res) => {
                console.log(res.data.message);
                setIsPending(true);
                setTimeout(()=>{
                    history.push("/dashboard");
                }, 1000)
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    useEffect(() => {
        axios
            .get("api/profile/", {
                headers: { Authorization: `Bearer ${isAuthenticated().token}` },
            })
            .then((res) => setProfile({ ...res.data }));
    }, []);

    const [modalOpen, setModalOpen] = useState(false);

    const modalBody = (
        <div className="modal-dialog">
            <form className="modal" onSubmit={handleChangePassword}>
                <Button variant="outlined" color="primary" onClick={()=>setModalOpen(!modalBody)}>Cancel</Button>
                <Typography variant="h3">Change your password</Typography>
                <TextField
                    type="password"
                    label="Current Password"
                    variant="outlined"
                    value={currentPassword}
                    required
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <TextField
                    type="password"
                    label="New Password"
                    variant="outlined"
                    value={newPassword}
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="secondary">
                    Change Password
                </Button>
                {isPending && <h2>Password Changed,  Redirecting to Dashboard</h2>}
            </form>
        </div>
    );

    return (
        <Container
            maxWidth="md"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
            }}
        >
            <div className="profile-image">
                <Avatar
                    alt="Remy Sharp"
                    src={face4}
                    style={{
                        width: "100px",
                        height: "100px",
                        alignItems: "center",
                    }}
                />
            </div>
            <Card
                elevation={2}
                raised={false}
                style={{ width: "400px", marginTop: "1rem" }}
            >
                <CardContent>
                    <Typography variant="h4" component="h4">
                        My Profile
                    </Typography>
                </CardContent>
                <CardContent>
                    <TableContainer component={Paper} variant="outlined">
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h5">
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5">
                                            {profile.full_name}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h5">
                                            Email
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5">
                                            {profile.email}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h5">
                                            Class
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5">
                                            {profile.standard}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h5">
                                            Section
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5">
                                            {profile.section}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardContent>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setModalOpen(!modalOpen)}
                    >
                        Change Password
                    </Button>
                    <Modal
                        open={modalOpen}
                        onClose={() => setModalOpen(!modalOpen)}
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        BackdropComponent={Backdrop}
                        BackdropProps={{    
                            timeout: 500,
                        }}
                    >
                        {modalBody}
                    </Modal>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Profile;

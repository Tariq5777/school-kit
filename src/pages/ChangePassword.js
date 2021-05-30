import axios from "axios";
import { useState } from "react";
import { Card, Form, Button, Alert, } from "react-bootstrap";
import { isAuthenticated } from "../helper/auth/authUtils";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router";
const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfPassword] = useState("");

    let history = useHistory()

    const [error, setError] = useState("")

    const { token } = isAuthenticated();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    };
    const handleChangePassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("New Passsword & Confirm Password is not same")
        }
        const data = new FormData();
        data.append("current_password", currentPassword)
        data.append("new_password", newPassword)


        axios
            .put('http://localhost:7000/api/change_password/', data, config)
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div>
            <Card style={{ width: '60rem', height: '30rem' }}>
                <Card.Header as="h2" align="center">Change Password</Card.Header>

                <Form className="m-5" onSubmit={handleChangePassword}>
                    <Form.Group className="mx-5" controlId="currentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter Current Password" />
                    </Form.Group>

                    <Form.Group className="mx-5" controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mx-5" controlId="newconfirmPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            placeholder="Confirm New Password" />
                    </Form.Group>
                    <div className="justify-content">
                        <Button className="ml-5 px-5" variant="primary" type="submit">Change Password</Button>
                    </div>
                </Form>
            </Card>
            {error && <Alert variant="danger">{error}</Alert>}

        </div>
    );
};



export default ChangePassword;

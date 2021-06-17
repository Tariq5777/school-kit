import { React, useState } from 'react'
import { Form, Container, Card, Row, Col, Button } from 'react-bootstrap'
import { Typography } from '@material-ui/core'
import axios from 'axios'
import { isAuthenticated } from '../../helper/auth/authUtils'
import { Redirect, useHistory } from 'react-router-dom'
const AddResult = () => {

    const [file, setFile] = useState(null)

    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("marks", file)
        axios
            .post("/api/marks/", formData, {
                headers: {
                    Authorization: `Bearer ${isAuthenticated().token}`
                },
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => { 
                console.log(error.message)
            });
    }


    return (
        <Container>
            <Card>
                <Card.Header>
                    <Typography variant="h4">Result</Typography>
                </Card.Header>
                <Card.Body>
                    <Row className="mx-3 my-2 h4">Download Result Format File for Upload</Row>
                    <Row>
                        <Col>
                            <Button className="mx-3" variant="primary"
                                onClick={() => window.location.href = 'http://localhost:7000/media/files/Result.csv'}
                            >Download .CSV File</Button>
                            <Button variant="primary"
                                onClick={() => window.location.href = 'http://localhost:7000/media/files/Result.xlsx'}
                            >Download .XLSX File</Button>
                        </Col>
                    </Row>
                    <Form onSubmit={handleSubmit} className = "mx-3 my-3">
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Result File</Form.Label>
                            <Form.Control
                                onChange={(e) => setFile(e.target.files[0])}
                                name="file"
                                type="file"
                                accept=".csv,.xlsx" />
                        </Form.Group>
                        <Button type="submit" variant="success">Upload File</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AddResult

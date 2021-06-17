import { Col, Table, Button } from "react-bootstrap"
import { Typography } from "@material-ui/core"
import { Container } from "@material-ui/core"
import axios from "axios"
import { useState, useEffect } from "react"
import { Card, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { isAuthenticated } from "../../helper/auth/authUtils"
const StudentResult = () => {

    const [result, setResult] = useState({
        full_name: "",
        first_term: "",
        second_term: "",
        total: "",
        standard: ""
    })

    
    useEffect(() => {
        axios
            .get('api/result/', { headers: { Authorization: `Bearer ${isAuthenticated().token}` } })
            .then(res => {
                setResult({ ...res.data })
                // console.log(result)
            })
            .catch(err => { console.log(err.message) })
    }, [])

    const printResult = (e) => {
        window.print();
    }
    

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Typography variant="h4">Result</Typography>
                </Card.Header>
                <Card.Body>
                    <Row className="my-4">
                        <Col className="font-weight-bold h4">{result.full_name}</Col>
                        <Col className="font-weight-bold h4">Standard {result.standard}</Col>
                    </Row>
                    <Table striped bordered hover id="printData"> 
                        <thead>
                            <tr>
                                <th>First Term</th>
                                <th>Second Term</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{result.first_term}</td>
                                <td>{result.second_term}</td>
                                <td>{result.total}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="primary" className="px-5" onClick={printResult}>Print</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default StudentResult
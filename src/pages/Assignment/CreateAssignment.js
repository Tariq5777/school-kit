import { Container, Typography } from "@material-ui/core";
import { useState } from "react";
import { Card } from "react-bootstrap";

const CreateAssignment = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [assignmentTitle,setAssignmentTitle] = useState("");
    const [assignmentBody,setAssignmentBody] = useState("");

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Typography variant="h4" >
                        Create a new Assignment :
                    </Typography>
                </Card.Header>
                <Card.Body>

                </Card.Body>
            </Card>
        </Container>
    );
};

export default CreateAssignment;

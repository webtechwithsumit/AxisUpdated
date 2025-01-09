import React from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";

// Define the TypeScript interface for the data
interface Input {
    label: string;
    value: string | number | boolean;
}

interface Task {
    messID: string;
    messName: string;
    messManager: string;
    managerNumber: string;
    messTaskNumber: string;
    inputs: Input[];
}

interface GroupedData {
    [messName: string]: Task[];
}

// Helper function to group data by messName
const groupByMessName = (data: Task[]): GroupedData => {
    return data.reduce((acc: GroupedData, item: Task) => {
        if (!acc[item.messName]) {
            acc[item.messName] = [];
        }
        acc[item.messName].push(item);
        return acc;
    }, {});
};

const MessCards: React.FC<{ data: Task[] }> = ({ data }) => {
    // Group the data
    const groupedData = groupByMessName(data);

    return (
        <div className="container mt-2 ">
            <Row>
                {Object.keys(groupedData).length === 0 ?
                    <Container className="my-5">
                        <Row className="justify-content-center">
                            <Col xs={12} md={8} lg={6}>
                                <Alert variant="info" className="text-center">
                                    <h4>No Details Found</h4>
                                    <p>You currently don't have any Data</p>
                                </Alert>
                            </Col>
                        </Row>
                    </Container>
                    : (Object.entries(groupedData).map(([messName, messTasks]) => (
                        <Col key={messName} md={6} lg={4} className="">
                            <Card>
                                <Card.Header className="bg-primary text-white">
                                    <h5 className="mb-0">{messName}</h5>
                                </Card.Header>
                                <Card.Body>
                                    {messTasks[0]?.messManager &&
                                        <p><strong>Manager:</strong> {messTasks[0]?.messManager}</p>
                                    }
                                    {messTasks[0]?.managerNumber &&
                                        <p><strong>Mess Manager Contact: </strong>
                                            <a
                                                href={`tel:${messTasks[0]?.managerNumber}`}
                                                className="ms-1 text-primary"
                                                style={{ textDecoration: "none" }}
                                                aria-label="Call"
                                            >
                                                <i className="ri-phone-fill" style={{ fontSize: "1rem" }}></i>
                                                {messTasks[0]?.managerNumber}
                                            </a>
                                        </p>
                                    }
                                    <hr />
                                    <h6>Tasks:</h6>

                                    {messTasks.map((task, index) => (
                                        <div key={index} className="mb-3">

                                            {task.messTaskNumber ?
                                                <p>
                                                    <strong>Task ID:</strong> {task.messTaskNumber}
                                                </p> : ''
                                            }
                                            {Array.isArray(task.inputs) && task.inputs.length > 0 ? (
                                                <ul>
                                                    {task.inputs.map(
                                                        (input, i) =>
                                                            input.label && (
                                                                <li key={i}>
                                                                    <strong>{input.label}:</strong>{" "}
                                                                    {input.value.toString()}
                                                                </li>
                                                            )
                                                    )}
                                                </ul>

                                            ) : (
                                                <p>No inputs available.</p>
                                            )}
                                            <hr />

                                        </div>
                                    ))}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                    )
                }







            </Row>
        </div>
    );
};



export default MessCards;

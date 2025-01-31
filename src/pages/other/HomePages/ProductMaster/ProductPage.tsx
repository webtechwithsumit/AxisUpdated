import { Link } from 'react-router-dom';
// import OwnProduct from './OwnProduct';
// import OtherProduct from './OtherProduct';
import { Card, Col, Nav, Row } from 'react-bootstrap';
const ProductPage = () => {





    return (
        <>
            <div className="mt-3">
                <Row>
                    <Col sm={12} >
                        <Card className="p-0">
                            <Card.Body className="p-4">
                                <div className="profile-content right-tab">
                                    <div className="mb-3 fw-bold w-100">
                                        <h4 className="p-2 text-primary border-primary profilebar">
                                            Manage Product
                                        </h4>
                                    </div>
                                    <Nav as="ul">
                                        <Nav.Item as="li">
                                            <Nav.Link as={Link} to="/pages/ProductPage/AddNewProduct" eventKey="AddNewProduct" type="button">
                                                Add New Product
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link as={Link} to="/pages/ProductPage/OwnDepartmentProduct" eventKey="OwnDepartmentProduct" type="button">
                                                Own Department Product
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link as={Link} to="/pages/ProductPage/OtherDepartmentProduct" eventKey="OtherDepartmentProducts" type="button">
                                                Other Department Products
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link as={Link} to="/ProductPage/SignOffProducts" eventKey="SignOffProducts" type="button">
                                                Sign-Off Products
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link as={Link} to="/ProductPage/RejectedProduct" eventKey="RejectedProduct" type="button">
                                                Rejected Product
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>




                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

        </>
    );
};

export default ProductPage;





import { Card, Col, Nav, Row, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import OwnProduct from './OwnProduct';
import OtherProduct from './OtherProduct';
import SignOffProduct from './SignOffProduct';
import RejectProduct from './RejectProduct';
import ProductMasterInsert from './ProductMasterinsert';
import Level1OtherProduct from './Level1OtherProduct';
import Level1MyProduct from './Level1MyProduct';

const ProfilePages = () => {
  const storedRole = localStorage.getItem('role')


  return (
    <>
      {storedRole === 'Convener level 1' &&


        <div className='mt-3'>
          <Row>
            <Col sm={12}>
              <Card className="p-0">
                <Card.Body className="p-0">
                  <div className="profile-content">
                    <Tab.Container defaultActiveKey="About" >
                      <div className='d-flex'>

                        <div className='w-100'>
                          <Tab.Content className="m-0 p-4">
                            <Tab.Pane eventKey="About" id="aboutme" tabIndex={0}>
                              <div className=' mb-3 fw-bold w-100'>
                                <h4 className='p-2 text-primary border-primary profilebar'> Home 	</h4>
                              </div>
                              <Tab.Container defaultActiveKey="OwnDepartmentProduct" >
                                <div className='right-tab'>
                                  <Nav as="ul">

                                    <Nav.Item>
                                      <Nav.Link
                                        eventKey="OwnDepartmentProduct"
                                        to="#"
                                        as={Link}
                                        type="button"
                                      >
                                        Product Organised by My  Department
                                      </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link
                                        eventKey="OtherDepartmentProducts"
                                        to="#"
                                        as={Link}
                                        type="button"
                                      >
                                        Product Organised by Other  Department

                                      </Nav.Link>
                                    </Nav.Item>
                                  </Nav>
                                  <div>
                                    <Tab.Content className="my-2">

                                      <Tab.Pane eventKey="OwnDepartmentProduct" id="user-activities">
                                        <Level1MyProduct />
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="OtherDepartmentProducts" id="user-activities">
                                        <Level1OtherProduct />
                                      </Tab.Pane>
                                    </Tab.Content>
                                  </div>
                                </div>
                              </Tab.Container>
                            </Tab.Pane>
                          </Tab.Content>
                        </div>
                      </div>
                    </Tab.Container>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      }
      {storedRole === 'Convener level 2' &&


        <div className='mt-3'>
          <Row>
            <Col sm={12}>
              <Card className="p-0">
                <Card.Body className="p-0">
                  <div className="profile-content">
                    <Tab.Container defaultActiveKey="About" >
                      <div className='d-flex'>

                        <div className='w-100'>
                          <Tab.Content className="m-0 p-4">
                            <Tab.Pane eventKey="About" id="aboutme" tabIndex={0}>
                              <div className=' mb-3 fw-bold w-100'>
                                <h4 className='p-2 text-primary border-primary profilebar'> Manage Product 	</h4>
                              </div>
                              <Tab.Container defaultActiveKey="AddNewProduct" >
                                <div className='right-tab'>
                                  <Nav as="ul">
                                    <Nav.Item as="li">
                                      <Nav.Link
                                        as={Link}
                                        to="#"
                                        eventKey="AddNewProduct"
                                        type="button"
                                      >
                                        Add New Product
                                      </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link
                                        eventKey="OwnDepartmentProduct"
                                        to="#"
                                        as={Link}
                                        type="button"
                                      >
                                        Own  Department Product
                                      </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link
                                        eventKey="OtherDepartmentProducts"
                                        to="#"
                                        as={Link}
                                        type="button"
                                      >
                                        Other  Department Products
                                      </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link
                                        eventKey="Sign-OffProducts"
                                        to="#"
                                        as={Link}
                                        type="button"
                                      >
                                        Sign-Off Products
                                      </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link
                                        eventKey="RejectedProduct"
                                        to="#"
                                        as={Link}
                                        type="button"
                                      >
                                        Rejected Product
                                      </Nav.Link>
                                    </Nav.Item>
                                  </Nav>
                                  <div>
                                    <Tab.Content className="my-2">
                                      <Tab.Pane eventKey="AddNewProduct" id="aboutme" tabIndex={0}>
                                        <ProductMasterInsert />
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="OwnDepartmentProduct" id="user-activities">
                                        <OwnProduct />
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="OtherDepartmentProducts" id="user-activities">
                                        <OtherProduct />
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="Sign-OffProducts" id="user-activities">
                                        <SignOffProduct />
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="RejectedProduct" id="user-activities">
                                        <RejectProduct />
                                      </Tab.Pane>
                                    </Tab.Content>
                                  </div>
                                </div>
                              </Tab.Container>
                            </Tab.Pane>
                          </Tab.Content>
                        </div>
                      </div>
                    </Tab.Container>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      }





    </>
  )
}

export default ProfilePages

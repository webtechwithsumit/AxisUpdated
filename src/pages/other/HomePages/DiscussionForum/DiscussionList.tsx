import { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import config from '@/config';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginationComponent from '../../Component/PaginationComponent';
import axios from 'axios';


interface Manager {
    id: number;
    departmentID: string;
    departmentName: string;
    departmentStatus: number;
    unresolvedQueries: string;
}


interface Column {
    id: string;
    label: string;
    visible: boolean;
}

const DiscussionList = () => {
    const [employee, setEmployee] = useState<Manager[]>(
        [
            {
                'id': 1,
                'departmentName': 'PRODUCT',
                'departmentID': 'PR',
                'departmentStatus': 1,
                'unresolvedQueries': 'Unresolved Post',
            },
            {
                'id': 2,
                'departmentName': 'PRODUCT',
                'departmentID': 'PR',
                'departmentStatus': 1,
                'unresolvedQueries': 'Unresolved Post',
            },
            {
                'id': 3,
                'departmentName': 'PRODUCT',
                'departmentID': 'PR',
                'departmentStatus': 1,
                'unresolvedQueries': 'Unresolved Post',
            },
            {
                'id': 4,
                'departmentName': 'PRODUCT',
                'departmentID': 'PR',
                'departmentStatus': 1,
                'unresolvedQueries': 'Unresolved Post',
            },
        ]
    );
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state?.successMessage) {
            toast.dismiss()
            toast.success(location.state.successMessage);
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, navigate]);



    // both are required to make dragable column of table 
    const [columns, setColumns] = useState<Column[]>([
        { id: 'departmentCode', label: 'Department Code  ', visible: true },
        { id: 'departmentName', label: 'Department Name ', visible: true },
        { id: 'departmentStatus', label: 'Department Status ', visible: true },
        { id: 'unresolvedQueries', label: 'Unresolved Queries ', visible: true },


    ]);

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;
        const reorderedColumns = Array.from(columns);
        const [movedColumn] = reorderedColumns.splice(result.source.index, 1);
        reorderedColumns.splice(result.destination.index, 0, movedColumn);
        setColumns(reorderedColumns);
    };
    // ==============================================================


    useEffect(() => {

        fetchEmployee();

    }, [currentPage]);




    const fetchEmployee = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.API_URL}/Manager/GetManager`, {
                params: { PageIndex: currentPage }
            });
            if (response.data.isSuccess) {
                setEmployee(response.data.managerList);
                setTotalPages(Math.ceil(response.data.totalCount / 10));
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching doers:', error);
        }
        finally {
            setLoading(false);
        }
    };



    return (

        <div className='p-3 mt-3 bg-white'>
            <Card className="shadow-none ">
                <div className="mb-3">
                    <h4 className="p-2 text-primary border-primary profilebar">Discussion Forum</h4>
                </div>

                <nav aria-label="breadcrumb">
                    <ul className="d-flex">
                        <li className="p-1"><a href="/">Home</a></li>
                        <li className="p-1"> {'>'}</li>
                        <li className="p-1"><a href="/manage-product">Manage Product</a></li>
                        <li className="p-1"> {'>'}</li>
                        <li className="p-1" aria-current="page">Discussion Board</li>
                    </ul>
                </nav>

                <div className='my-2'>
                    <Row>
                        <Col lg={6}> <span className='text-primary fs-16 fw-bold'> Product : </span> <span className='text-dark'>National Paision System (NPS)</span></Col>
                        <Col lg={6}> <span className='text-primary  fs-16 fw-bold'> Product Department : </span> <span className='text-dark'>PRODUCT</span></Col>
                        <Col lg={6}> <span className='text-primary fs-16 fw-bold'> Start Date : </span> <span className='text-dark'>31/12/2024</span></Col>
                        <Col lg={6}> <span className='text-primary fs-16 fw-bold'> End Date : </span> <span className='text-dark'> -</span></Col>
                    </Row>
                </div>
            </Card>


            {loading ? (
                <div className='loader-container'>
                    <div className="loader"></div>
                    <div className='mt-2'>Please Wait!</div>
                </div>
            ) : (
                <>

                    <div className="overflow-auto text-nowrap ">
                        {!employee ? (
                            <Container className="mt-5">
                                <Row className="justify-content-center">
                                    <Col xs={12} md={8} lg={6}>
                                        <Alert variant="info" className="text-center">
                                            <h4>No Data Found</h4>
                                            <p>You currently don't have any Data</p>
                                        </Alert>
                                    </Col>
                                </Row>
                            </Container>
                        ) : (
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Table hover className='bg-white custom-table'>
                                    <thead>
                                        <Droppable droppableId="columns" direction="horizontal">
                                            {(provided) => (
                                                <tr {...provided.droppableProps} ref={provided.innerRef as React.Ref<HTMLTableRowElement>}>
                                                    <th><i className="ri-list-ordered-2"></i>  Sr. No</th>
                                                    {columns.filter(col => col.visible).map((column, index) => (
                                                        <Draggable key={column.id} draggableId={column.id} index={index}>
                                                            {(provided) => (
                                                                <th>
                                                                    <div ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}>
                                                                        {column.id === 'managerName' && (<i className="ri-user-line"></i>)}
                                                                        {column.id === 'departmentName' && (<i className="ri-briefcase-line"></i>)}
                                                                        {column.id === 'status' && (<i className="ri-flag-line"></i>)}
                                                                        &nbsp; {column.label}
                                                                    </div>
                                                                </th>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    <th>Action</th>
                                                </tr>
                                            )}
                                        </Droppable>
                                    </thead>
                                    <tbody>
                                        {employee.length > 0 ? (
                                            employee.slice(0, 10).map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                                                    {columns.filter(col => col.visible).map((col) => (
                                                        <td key={col.id}>
                                                            {col.id === 'departmentStatus'
                                                                ? item.departmentStatus === 1
                                                                    ? 'Active'
                                                                    : 'Inactive'
                                                                : (item as any)[col.id]}
                                                        </td>
                                                    ))}
                                                    <td><Link to={`/pages/ManagerMasterinsert/${item.id}`}>
                                                        <Button variant='primary' className='icon-padding text-white'>
                                                            <i className='fs-18 ri-edit-line text-white' ></i>
                                                        </Button>
                                                    </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={12}>
                                                    <Container className="mt-5">
                                                        <Row className="justify-content-center">
                                                            <Col xs={12} md={8} lg={6}>
                                                                <Alert variant="info" className="text-center">
                                                                    <h4>No Data  Found</h4>
                                                                    <p>You currently don't have any Data</p>
                                                                </Alert>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </DragDropContext>
                        )}
                    </div>
                </>

            )}

            <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
    );
};

export default DiscussionList;
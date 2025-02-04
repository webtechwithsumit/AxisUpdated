import { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col, Alert, Form, ButtonGroup, Collapse, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import config from '@/config';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginationComponent from '../../Component/PaginationComponent';
import axios from 'axios';
import ApprovalPopup from './ApprovalPopup';


interface Manager {
    id: number;
    managerName: string;
    departmentID: number;
    status: number;
    createdBy: string;
    updatedBy: string;
    downloadDocuments: DocumentItem[];
    getProductChecklistByProductNames: ProductChecklist[];
}

interface DocumentItem {
    files: string;
    fileUrls: string[];
}

interface ProductChecklist {
    name: string;
    status: number; // Assuming status is a number (1 for checked, 0 for unchecked)
}

interface Column {
    id: string;
    label: string;
    visible: boolean;
}

interface EmployeeList {
    empId: string;
    employeeName: string;
}

interface ModuleProjectList {
    id: string;
    projectName: string
    moduleName: string
}


const EmployeeMaster = () => {
    const [employee, setEmployee] = useState<Manager[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [employeeList, setEmployeeList] = useState<EmployeeList[]>([]);
    const [projectList, setProjectList] = useState<ModuleProjectList[]>([])
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [show, setShow] = useState(false);
    const [showReject, setShowReject] = useState(false);
    const [manageId, setManageID] = useState<number>();
    const [expandedRow, setExpandedRow] = useState<number | null>(null); // For row expansion
    const storedEmployeeName = localStorage.getItem('EmpId');


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
        { id: 'productName', label: 'Product  Name ', visible: true },
        { id: 'productType', label: 'Product Type ', visible: true },
        { id: 'departmentName', label: 'Department Name ', visible: true },
        { id: 'createdDate', label: 'Start Date ', visible: true },
        // { id: 'status', label: 'Status ', visible: true },


    ]);

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;
        const reorderedColumns = Array.from(columns);
        const [movedColumn] = reorderedColumns.splice(result.source.index, 1);
        reorderedColumns.splice(result.destination.index, 0, movedColumn);
        setColumns(reorderedColumns);
    };
    // ==============================================================



    const [searchEmployee, setSearchEmployee] = useState('');
    const [searchProject, setSearchProject] = useState('');
    const [searchAppAccessLevel, setSearchAppAccessLevel] = useState('');
    const [searchDataAccessLevel, setSearchDataAccessLevel] = useState('');
    const [searchAppAccess, setSearchAppAccess] = useState('');
    const [searchEmpstatus, setSearchEmpstatus] = useState('');



    useEffect(() => {
        if (!searchTriggered) {
            fetchEmployee();
        }
    }, [currentPage]);

    useEffect(() => {
        if (searchTriggered) {
            if (searchEmployee || searchProject || searchAppAccessLevel || searchDataAccessLevel || searchAppAccess || searchEmpstatus) {
                (async () => {
                    await handleSearch();
                })();
            } else {
                fetchEmployee();
            }
        }
    }, [searchTriggered, currentPage]);


    const handleSearch = async () => {
        try {
            let query = `?`;

            if (searchEmployee) query += `EmployeeName=${searchEmployee}&`;
            if (searchProject) query += `CurrentProjectName=${searchProject}&`;
            if (searchAppAccessLevel) query += `AppAccessLevel=${searchAppAccessLevel}&`;
            if (searchDataAccessLevel) query += `DataAccessLevel=${searchDataAccessLevel}&`;
            if (searchAppAccess) query += `AppAccess=${searchAppAccess}&`;
            if (searchEmpstatus) query += `EmpStatus=${searchEmpstatus}&`;
            query += `PageIndex=${currentPage}`;
            query = query.endsWith('&') ? query.slice(0, -1) : query;

            const apiUrl = `${config.API_URL}/EmployeeMaster/SearchEmployee${query}`;
            console.log("API URL:", apiUrl);

            setLoading(true);

            const { data } = await axios.get(apiUrl, { headers: { accept: '*/*' } });

            if (data.isSuccess) {  // Ensure successful response
                setEmployee(data.employeeMasterList);
                setTotalPages(Math.ceil(data.totalCount / 10));
                console.log("Search Response:", data.employeeMasterList);
            } else {
                console.log("Error in API response:", data.message);  // Handle error message if needed
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    const downloadFiles = async (file: string, name: any) => {
        console.log(file)
        console.log(name)
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.API_URL}/UploadDocument/DownloadFile`,
                params: { filename: file },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };



    const handleClear = async () => {
        setCurrentPage(1);
        setSearchEmployee('');
        setSearchProject('');
        setSearchAppAccessLevel('');
        setSearchDataAccessLevel('');
        setSearchAppAccess('');
        setSearchEmpstatus('');
        setSearchTriggered(false);
        await new Promise(resolve => setTimeout(resolve, 200));
        await fetchEmployee();
    };

    console.log(employee)
    const fetchEmployee = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.API_URL}/Product/GetProductListByAssignee`, {
                params: { Assignee: storedEmployeeName }
            });
            if (response.data.isSuccess) {
                setEmployee(response.data.getProducts);
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


    useEffect(() => {
        const fetchData = async (endpoint: string, setter: Function, listName: string) => {
            try {
                const response = await axios.get(`${config.API_URL}/${endpoint}`);
                if (response.data.isSuccess) {
                    setter(response.data[listName]);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error(`Error fetching data from ${endpoint}:`, error);
            }
        };

        fetchData('CommonDropdown/GetEmployeeListWithId', setEmployeeList, 'employeeLists');
        fetchData('CommonDropdown/GetProjectList', setProjectList, 'projectListResponses');
    }, []);


    const optionsEmpStatus = [
        { value: 'Current', label: 'Current' },
        { value: 'Former', label: 'Former' },
        { value: 'Absconding', label: 'Absconding' },
    ];


    // const handleShow = () => setShow(true);
    const handleShowReject = () => setShowReject(true);


    // const handleEdit = (id: any) => {
    //     handleShow();
    //     setManageID(id)

    // };
    const handleReject = (id: any) => {
        handleShowReject();
        setManageID(id)

    };

    const toggleExpandRow = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };


    return (



        <div className='p-3 mt-3 bg-white'>
            <Row className=' mb-2 px-2'>
                <div className="d-flex justify-content-between profilebar p-1">
                    <h4 className='text-primary d-flex align-items-center m-0 p-1'><i className="ri-file-list-line me-2 text-primary "></i>  Pending Approval </h4>
                </div>
            </Row>
            <div className='bg-white p-2 pb-2'>
                <Form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setSearchTriggered(true);
                        await setCurrentPage(1);

                    }}
                >
                    <Row>
                        <Col lg={4} className="mt-2">
                            <Form.Group controlId="searchEmployee">
                                <Form.Label>Product Name</Form.Label>
                                <Select
                                    name="searchEmployee"
                                    value={employeeList.find(emp => emp.employeeName === searchEmployee) || null} // handle null
                                    onChange={(selectedOption) => setSearchEmployee(selectedOption ? selectedOption.employeeName : "")} // null check
                                    options={employeeList}
                                    getOptionLabel={(emp) => emp.employeeName}
                                    getOptionValue={(emp) => emp.employeeName.split('-')[0].trim()}
                                    isSearchable={true}
                                    placeholder="Select Product Name"
                                    className="h45"
                                />
                            </Form.Group>
                        </Col>

                        <Col lg={4} className="mt-2">
                            <Form.Group controlId="searchProject">
                                <Form.Label>Department Name</Form.Label>
                                <Select
                                    name="searchProject"
                                    value={projectList.find(item => item.projectName === searchProject)}
                                    onChange={(selectedOption) => setSearchProject(selectedOption ? selectedOption.projectName : '')}
                                    options={projectList}
                                    getOptionLabel={(task) => task.projectName}
                                    getOptionValue={(task) => task.projectName}
                                    isSearchable={true}
                                    placeholder="Select Department Name"
                                    className="h45"
                                />
                            </Form.Group>
                        </Col>



                        <Col lg={4} className="mt-2">
                            <Form.Group controlId="searchEmpstatus">
                                <Form.Label>Employee Status</Form.Label>
                                <Select
                                    name="searchEmpstatus"
                                    options={optionsEmpStatus}
                                    value={optionsEmpStatus.find(option => option.value === searchEmpstatus) || null}
                                    onChange={(selectedOption) => setSearchEmpstatus(selectedOption?.value || '')}
                                    placeholder="Select Employee Status"
                                />
                            </Form.Group>
                        </Col>

                        <Col></Col>

                        <Col lg={4} className="align-items-end d-flex justify-content-end mt-3">
                            <ButtonGroup aria-label="Basic example" className="w-100">
                                <Button type="button" variant="primary" onClick={handleClear}>
                                    <i className="ri-loop-left-line"></i>
                                </Button>
                                &nbsp;
                                <Button type="submit" variant="primary"

                                >
                                    Search
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Form>

                <Row className='mt-3'>
                    <div className="d-flex justify-content-end bg-light p-1">
                        <div className="app-search d-none d-lg-block me-4">
                        </div>
                    </div>
                </Row>
            </div>

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
                                <Table hover className='bg-white '>
                                    <thead>
                                        <Droppable droppableId="columns" direction="horizontal">
                                            {(provided) => (
                                                <tr {...provided.droppableProps} ref={provided.innerRef as React.Ref<HTMLTableRowElement>}>
                                                    <th><i className="ri-list-ordered-2"></i>  Sr. No</th>
                                                    {columns.filter(col => col.visible).map((column, index) => (
                                                        <Draggable key={column.id} draggableId={column.id} index={index}>
                                                            {(provided) => (
                                                                <th
                                                                    key={column.id}
                                                                    className={
                                                                        column.id === 'projectName' ? 'text-end' :
                                                                            column.id === 'isCompleted' ? 'text-end' :
                                                                                column.id === 'planDate' ? 'text-end' :
                                                                                    ''
                                                                    }
                                                                >
                                                                    <div ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}>
                                                                        {column.id === 'processName' && (<i className="ri-map-2-line"></i>)}
                                                                        {column.id === 'projectName' && (<i className="ri-building-line"></i>)}
                                                                        {column.id === 'task_Number' && (<i className="ri-health-book-line pl-1-5"></i>)}
                                                                        {column.id === 'isCompleted' && (<i className="ri-flag-line"></i>)}
                                                                        {column.id === 'planDate' && (<i className="ri-hourglass-line"></i>)}
                                                                        {column.id === 'taskName' && (<i className="ri-tools-line"></i>)}
                                                                        &nbsp; {column.label}
                                                                    </div>
                                                                </th>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                    <th className='text-center pr-3'>View</th>
                                                </tr>
                                            )}
                                        </Droppable>
                                    </thead>
                                    <tbody>
                                        {employee.length > 0 ? (
                                            employee.slice(0, 10).map((item, index) => (
                                                <>
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        {columns.filter(col => col.visible).map((col) => (
                                                            <td key={col.id}>
                                                                {Array.isArray(item[col.id as keyof Manager])
                                                                    ? (item[col.id as keyof Manager] as DocumentItem[]).map((doc, index) => (
                                                                        <span key={index}>
                                                                            {doc.files.split('\\').pop()}
                                                                            <br />
                                                                        </span>
                                                                    ))
                                                                    : (item[col.id as keyof Manager] as string | number)
                                                                }
                                                            </td>

                                                        ))}

                                                        <td className='text-end pr-3'>
                                                            <Button onClick={() => toggleExpandRow(item.id)}>
                                                                {expandedRow === item.id ? <i className=" fs-16 ri-arrow-up-s-line"></i> : <i className=" fs-16 ri-arrow-down-s-line"></i>}
                                                            </Button>
                                                        </td>
                                                    </tr>

                                                    {expandedRow && expandedRow === item.id ?
                                                        <tr>
                                                            <td colSpan={12}>
                                                                <Collapse in={expandedRow === item.id}>
                                                                    <div className='p-2'>

                                                                        <div className='my-3'>
                                                                            <Row className='mb-2'>
                                                                                <Col lg={4}> <span className='text-primary fs-16 fw-bold'> Product : </span> <span className='text-dark'>National Paision System (NPS)</span></Col>
                                                                                <Col lg={4}> <span className='text-primary  fs-16 fw-bold'> Product Department : </span> <span className='text-dark'>PRODUCT</span></Col>
                                                                                <Col lg={4}> <span className='text-primary fs-16 fw-bold'> Start Date : </span> <span className='text-dark'>31/12/2024</span></Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col lg={4}> <span className='text-primary fs-16 fw-bold'> End Date : </span> <span className='text-dark'> -</span></Col>
                                                                                <Col lg={4}> <span className='text-primary fs-16 fw-bold'>  Department Thread : </span> <span className='text-dark'>CUSTOMER SERVICE AND CALL&TRADE</span></Col>
                                                                            </Row>
                                                                        </div>


                                                                        <Row>
                                                                            <Col lg={6}>
                                                                                <div className="d-flex justify-content-between bg-light p-1 profilebar">
                                                                                    <h4 className='text-primary d-flex align-items-center m-0 py-1'><i className="ri-file-list-line me-2 text-primary "></i> CheckList </h4>
                                                                                </div>
                                                                                <Table hover className="bg-white custom-table">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>Name</th>
                                                                                            <th className='w-100px text-center'>Status</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {item.getProductChecklistByProductNames.map((list) => (
                                                                                            <tr key={list.name}>
                                                                                                <td>{list.name}</td>
                                                                                                <td className='text-center'>
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        checked={list.status === 1}
                                                                                                    />
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </Table>
                                                                            </Col>
                                                                            <Col lg={6}>
                                                                                <div className="d-flex justify-content-between bg-light p-1 profilebar">
                                                                                    <h4 className='text-primary d-flex align-items-center m-0 py-1'><i className="ri-file-list-line me-2 text-primary "></i> Document </h4>
                                                                                </div>
                                                                                <Table hover className="bg-white custom-table">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>File Name</th>
                                                                                            <th className='text-center'>Download</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {item.downloadDocuments.map((doc, index) => (
                                                                                            <tr key={index}>
                                                                                                <td> {doc.files.split('\\').pop()}</td>
                                                                                                <td className="text-center p-0">

                                                                                                    {doc.fileUrls.map((fileUrl) => (
                                                                                                        <>
                                                                                                            <Button className='p-0'
                                                                                                                variant="link"
                                                                                                                onClick={() => downloadFiles(fileUrl, doc.files.split('\\').pop())}
                                                                                                            >
                                                                                                                <i className="fs-20 ri-arrow-down-circle-line"></i>
                                                                                                            </Button>
                                                                                                        </>
                                                                                                    ))}

                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>


                                                                                </Table>
                                                                            </Col>
                                                                        </Row>
                                                                        <Col className="d-flex justify-content-end">
                                                                            <ButtonGroup>
                                                                                <Button className='me-1' onClick={handleReject}>Reject</Button>
                                                                                <Link to={`/pages/DiscussionForum/${item.id}`}>
                                                                                    <Button className='me-1'>Discussion Board</Button>
                                                                                </Link>
                                                                                <Button >Approval</Button>
                                                                            </ButtonGroup>
                                                                        </Col>
                                                                    </div>
                                                                </Collapse>
                                                            </td>
                                                        </tr>
                                                        : ''
                                                    }
                                                </>

                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={12}>
                                                    <Container className="mt-5">
                                                        <Row className="justify-content-center">
                                                            <Col xs={12} md={8} lg={6}>
                                                                <Alert variant="info" className="text-center">
                                                                    <h4>No Data Found</h4>
                                                                    <p>You currently don't have Data</p>
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

            <Modal show={showReject} onHide={() => setShowReject(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Rejection Reason</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="rejectionReason">
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>

            <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            <ApprovalPopup show={show} setShow={setShow} manageId={manageId} />
        </div>


    );
};

export default EmployeeMaster;
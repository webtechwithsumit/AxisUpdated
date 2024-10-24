import axios from 'axios';
import { useEffect, useState, ChangeEvent } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import config from '@/config';
import Select from 'react-select';




interface Mess {
    id: number
    messID: string;
    messName: string;
    managerEmpID: string;
    managerName: string;
    projectName: string;
    status: string;
    createdBy: string;
    updatedBy: string;
}

interface ProjectList {
    id: string;
    projectName: string
}
interface Status {
    id: string;
    name: string
}
interface EmployeeList {
    empId: string;
    employeeName: string
}

const EmployeeInsert = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [empName, setEmpName] = useState<string | null>('')
    const [projectList, setProjectList] = useState<ProjectList[]>([])
    const [statusList, setStatusList] = useState<Status[]>([])
    const [employeeList, setEmployeeList] = useState<EmployeeList[]>([])
    const [messes, setMesses] = useState<Mess>({
            id: 0,
            messID: '',
            messName: '',
            managerEmpID: '',
            managerName: '',
            projectName: '',
            status: '',
            createdBy: '',
            updatedBy: ''
        }
    );


    console.log(messes)

    useEffect(() => {
        const storedEmpName = localStorage.getItem('EmpName');
        if (storedEmpName) {
            setEmpName(storedEmpName);
        }
    }, []);


    useEffect(() => {
        if (id) {
            setEditMode(true);
            fetchDoerById(id);
        } else {
            setEditMode(false);
        }
    }, [id]);


    console.log(id)

    const fetchDoerById = async (id: string) => {
        try {
            const response = await axios.get(`${config.API_URL_APPLICATION}/MessMaster/GetMess`, {
                params: { id: id }
            });
            if (response.data.isSuccess) {
                const fetchedModule = response.data.messMasterList[0];
                setMesses(fetchedModule);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching module:', error);
        }
    };


    useEffect(() => {
        const fetchData = async (endpoint: string, setter: Function, listName: string) => {
            try {
                const response = await axios.get(`${config.API_URL_APPLICATION}/${endpoint}`);
                if (response.data.isSuccess) {
                    setter(response.data[listName]);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error(`Error fetching data from ${endpoint}:`, error);
            }
        };

        fetchData('CommonDropdown/GetProjectList', setProjectList, 'projectListResponses');
        fetchData('CommonDropdown/GetStatus', setStatusList, 'statusListResponses');
        fetchData('CommonDropdown/GetEmployeeListWithId', setEmployeeList, 'employeeLists');
   


    }, []);



    const handleChange = (e: ChangeEvent<any>) => {
        const { name, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setMesses({
                ...messes,
                [name]: checked
            });
        } else {
            const value = (e.target as HTMLInputElement | HTMLSelectElement).value;
            setMesses({
                ...messes,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            ...messes,
            createdBy: editMode ? messes.createdBy : empName,
            updatedBy: editMode ? empName : '',
        };

        console.log(payload)

        try {
            if (editMode) {
                await axios.post(`${config.API_URL_APPLICATION}/MessMaster/UpdateMess`, payload);
            } else {
                await axios.post(`${config.API_URL_APPLICATION}/MessMaster/InsertMess`, payload);
            }
            navigate('/pages/MessMaster');
        } catch (error) {
            console.error('Error submitting module:', error);
        }
    };


    return (
        <div>
            <div className="container">
                <div className="d-flex bg-white p-2 my-2 justify-content-between align-items-center fs-20 rounded-3 border">
                    <span><i className="ri-file-list-line me-2"></i><span className='fw-bold'>{editMode ? 'Edit Mess' : 'Add Mess'}</span></span>
                </div>
                <div className='bg-white p-2 rounded-3 border'>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={6}>
                                <Form.Group controlId="messID" className="mb-3">
                                    <Form.Label>Mess ID:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="messID"
                                        value={messes.messID}
                                        onChange={handleChange}
                                        required
                                        placeholder='Enter Role Name'
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group controlId="messName" className="mb-3">
                                    <Form.Label>Mess Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="messName"
                                        value={messes.messName}
                                        onChange={handleChange}
                                        required
                                        placeholder='Enter Role Name'
                                    />
                                </Form.Group>
                            </Col>

                            <Col lg={6}>
                                <Form.Group controlId="status" className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Select
                                        name="status"
                                        value={statusList.find((mod) => mod.name === messes.status)}
                                        onChange={(selectedOption) => {
                                            setMesses({
                                                ...messes,
                                                status: selectedOption?.name || '',
                                            });
                                        }}
                                        getOptionLabel={(mod) => mod.name}
                                        getOptionValue={(mod) => mod.name}
                                        options={statusList}
                                        isSearchable={true}
                                        placeholder="Select Module Name"
                                        required
                                    />
                                </Form.Group>
                            </Col>


                            <Col lg={6}>
                                <Form.Group controlId="managerEmpID" className="mb-3">
                                    <Form.Label>Manager Name</Form.Label>
                                    <Select
                                        name="managerEmpID"
                                        value={employeeList.find((mod) => mod.employeeName === messes.managerName)}
                                        onChange={(selectedOption) => {
                                            setMesses({
                                                ...messes,
                                                managerName: selectedOption?.employeeName || '',
                                                managerEmpID: selectedOption?.empId || '',
                                            });
                                        }}
                                        getOptionLabel={(mod) => mod.employeeName.split('_')[0]}
                                        getOptionValue={(mod) => mod.employeeName}
                                        options={employeeList}
                                        isSearchable={true}
                                        placeholder="Select Module Name"
                                        required
                                    />
                                </Form.Group>
                            </Col>



                            <Col lg={6}>
                                <Form.Group controlId="projectName" className="mb-3">
                                    <Form.Label>Project Name</Form.Label>
                                    <Select
                                        name="projectName"
                                        value={projectList.find((mod) => mod.projectName === messes.projectName)}
                                        onChange={(selectedOption) => {
                                            setMesses({
                                                ...messes,
                                                projectName: selectedOption?.projectName || '',
                                            });
                                        }}
                                        getOptionLabel={(mod) => mod.projectName}
                                        getOptionValue={(mod) => mod.projectName}
                                        options={projectList}
                                        isSearchable={true}
                                        placeholder="Select Module Name"
                                        required
                                    />
                                </Form.Group>
                            </Col>






                            <Col className='align-items-end d-flex justify-content-between mb-3'>
                                <div>
                                    <span className='fs-5 '>This field is required*</span>
                                </div>
                                <div>
                                    <Link to={'/pages/MessMaster'}>
                                        <Button variant="primary" >
                                            Back
                                        </Button>
                                    </Link>
                                    &nbsp;
                                    <Button variant="primary" type="submit">
                                        {editMode ? 'Update Mess' : 'Add Mess'}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeInsert;
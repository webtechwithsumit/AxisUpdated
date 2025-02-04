import { useEffect, useState, ChangeEvent } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import config from '@/config';
import { toast } from 'react-toastify';
import axios from 'axios';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

interface Department {
    id: number;
    name: string;
    date: string;
    description: string;
    createdBy: string;
    updatedBy: string;
}


const AddHoliDay = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [empName, setEmpName] = useState<string | null>(null);
    const [departments, setDepartments] = useState<Department>({
        id: 0,
        name: '',
        date: '',
        description: '',
        createdBy: '',
        updatedBy: '',
    });

    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        toast.dismiss();

        const storedEmpName = localStorage.getItem('EmpName');
        const storedEmpID = localStorage.getItem('EmpId');
        if (storedEmpName || storedEmpID) {
            setEmpName(`${storedEmpName} - ${storedEmpID}`);
        }
    }, []);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            fetchDepartmentById(id);
        } else {
            setEditMode(false);
        }
    }, [id]);

    const fetchDepartmentById = async (id: string) => {
        try {
            const response = await axios.get(`${config.API_URL}/Department/GetDepartment`, {
                params: { id: id }
            });
            if (response.data.isSuccess) {
                const fetchedDepartment = response.data.departmentList[0];
                setDepartments(fetchedDepartment);
            } else {
                toast.error(response.data.message || 'Failed to fetch department data');
            }
        } catch (error) {
            toast.error('Error fetching department data');
            console.error('Error fetching department:', error);
        }
    };




    const validateFields = (): boolean => {
        const errors: { [key: string]: string } = {};

        if (!departments.name.trim()) {
            errors.name = ' Name is required';
        }
        if (!departments.date.trim()) {
            errors.date = 'Date is required';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        const parsedValue = type === 'radio' ? parseInt(value, 10) : value;
        setDepartments({
            ...departments,
            [name]: parsedValue
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateFields()) {
            toast.dismiss();
            toast.error('Please fill in all required fields.');
            return;
        }

        const payload = {
            ...departments,
            createdBy: editMode ? departments.createdBy : empName,
            updatedBy: editMode ? empName : ''
        };


        console.log(payload)
        try {
            const apiUrl = `${config.API_URL}/Department/InsertUpdateDepartment`;
            const response = await axios.post(apiUrl, payload);
            if (response.status === 200) {
                navigate('/pages/departmentMaster', {
                    state: {
                        successMessage: editMode
                            ? `Record updated successfully!`
                            : `Record    added successfully!`
                    }
                });
            } else {
                toast.error(response.data.message || 'Failed to process request');
            }
        } catch (error: any) {
            toast.dismiss();
            toast.error(error.response?.data?.message || 'An error occurred while submitting the form.');
            console.error('Error submitting department:', error);
        }
    };

    return (
        <div>
            <div className=" bg-white  p-3 mt-3">
                <div className="d-flex profilebar p-2 my-2 justify-content-between align-items-center fs-20 rounded-3 border">
                    <h4 className='text-primary m-0'>
                        <i className="ri-file-list-line me-2"></i>
                        <span className="fw-bold">{editMode ? 'Edit Holiday' : 'Add Holiday'}</span>
                    </h4>
                </div>
                <div className="bg-white p-2 rounded-3 border">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={6}>
                                <Form.Group controlId="name" className="mb-3">
                                    <Form.Label><i className="ri-building-line"></i>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={departments.name}
                                        onChange={handleChange}
                                        placeholder="Enter  Name"
                                        className={validationErrors.name ? 'input-border' : ''}
                                    />
                                    {validationErrors.name && (
                                        <small className="text-danger">{validationErrors.name}</small>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group controlId="departmentCode" className="mb-3">
                                    <Form.Label><i className="ri-building-line"></i> Date</Form.Label>
                                    <Flatpickr
                                        value={departments.date}
                                        onChange={([date]) => {
                                            if (date) {
                                                const formattedDate = date.toLocaleDateString('en-CA');
                                                setDepartments({
                                                    ...departments,
                                                    date: formattedDate,
                                                });
                                            }
                                        }}
                                        options={{
                                            enableTime: false,
                                            dateFormat: "Y-m-d",
                                            time_24hr: false,
                                        }}
                                        placeholder="Start Date "
                                        className={" form-control "}
                                    />
                                    {validationErrors.departmentCode && (
                                        <small className="text-danger">{validationErrors.departmentCode}</small>
                                    )}
                                </Form.Group>
                            </Col>


                            <Col lg={6}>
                                <Form.Group controlId="description" className="mb-3">
                                    <Form.Label><i className="ri-building-line"></i>  Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        value={departments.description}
                                        onChange={handleChange}
                                        placeholder="Enter  Description"
                                        className={validationErrors.description ? 'input-border' : ''}
                                        rows={3}
                                        maxLength={300}
                                    />
                                    {validationErrors.description && (
                                        <small className="text-danger">{validationErrors.description}</small>
                                    )}
                                </Form.Group>
                            </Col>


                        </Row>
                        <Row>

                            <Col className="d-flex justify-content-end mb-3">
                                <div>
                                    <Link to="/pages/DepartmentMaster">
                                        <Button variant="primary">Back</Button>
                                    </Link>
                                    &nbsp;
                                    <Button variant="primary" type="submit">
                                        {editMode ? 'Update Holiday' : 'Add Holiday'}
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

export default AddHoliDay;

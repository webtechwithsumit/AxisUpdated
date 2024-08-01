<<<<<<< HEAD
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Form, Button } from 'react-bootstrap';

const YourComponent = () => {
  const [formData, setFormData] = useState({
    ModuleName: '',
    processes: '',
    taskName: ''
  });

  const [inventory, setInventory] = useState([
    { id: '1', labeltext: 'Field 1' },
    { id: '2', labeltext: 'Field 2' },
    { id: '3', labeltext: 'Field 3' },
    // Add more fields as needed
  ]);

  const [taskFields, setTaskFields] = useState([
    {
      id: 'task1',
      labeltext: 'Task 1',
      children: []
    },
    // Add initial tasks as needed
  ]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic
  };
=======
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form, Offcanvas, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';

interface MessMaster {
    id: number;
    project_Id: number;
    messName: string;
    managerId: number;
    status: boolean;
    createdBy: string;
    updatedBy: string;
}

const MessMasterComponent: React.FC = () => {
    const [mess, setMess] = useState<MessMaster>({
        id: 0,
        project_Id: 0,
        messName: '',
        managerId: 0,
        status: false,
        createdBy: '',
        updatedBy: ''
    });

    const [messes, setMesses] = useState<MessMaster[]>([]);
    const [show, setShow] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        fetchMesses();
    }, [currentPage, rowsPerPage]);

    const fetchMesses = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://localhost:7074/api/MessMaster/GetMess', {
                params: {
                    PageIndex: currentPage
                }
            });
            if (response.data.isSuccess) {
                setMesses(response.data.messMasterList);
                console.log(response.data.messMasterList);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching messes:', error);
        }
        finally {
            setLoading(false); // End loading
        }
    };
>>>>>>> sumit-dev

  const handleDragEnd = (result) => {
    // Handle drag end logic
  };

<<<<<<< HEAD
  const handleSaveTask = () => {
    // Handle save task logic
  };

  const addInputField = (taskId) => {
    setTaskFields((prevFields) =>
      prevFields.map((task) =>
        task.id === taskId
          ? {
              ...task,
              children: [
                ...task.children,
                { id: `${taskId}-${task.children.length + 1}`, labeltext: 'New Field' }
              ]
            }
          : task
      )
=======
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement | HTMLSelectElement;
        if (type === 'checkbox') {
            setMess({
                ...mess,
                [name]: checked
            });
        } else {
            setMess({
                ...mess,
                [name]: type === 'number' ? Number(value) : value
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (editingIndex !== null) {
                await axios.post('https://localhost:7074/api/MessMaster/UpdateMess', mess);
            } else {
                await axios.post('https://localhost:7074/api/MessMaster/InsertMess', mess);
            }
            fetchMesses();
            handleClose();
        } catch (error) {
            console.error('Error submitting mess:', error);
        }
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setMess(messes[index]);
        handleShow();
    };

    const handleClose = () => {
        setShow(false);
        setEditingIndex(null);
        setMess({
            id: 0,
            project_Id: 0,
            messName: '',
            managerId: 0,
            status: false,
            createdBy: '',
            updatedBy: ''
        });
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleRowsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page on rows per page change
    };

    const filteredMesses = messes.filter(mess =>
        mess.messName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mess.project_Id.toString().includes(searchQuery)
>>>>>>> sumit-dev
    );
  };

<<<<<<< HEAD
  const renderField = (field, parentIndex, index) => {
    return (
      <div>
        {field.labeltext}
        <Button variant="link" onClick={() => addInputField(field.id)}>
          Add
        </Button>
        {field.children && field.children.length > 0 && (
          <Droppable droppableId={`${field.id}-children`} type="child">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {field.children.map((child, childIndex) => (
                  <Draggable key={child.id} draggableId={child.id} index={childIndex}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="list-group-item col-md-6 col-sm-12 border-none my-1 p-1"
                      >
                        {renderField(child, index, childIndex)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </div>
=======
    const indexOfLastMess = currentPage * rowsPerPage;
    const indexOfFirstMess = indexOfLastMess - rowsPerPage;
    const currentMesses = filteredMesses.slice(indexOfFirstMess, indexOfLastMess);

    const totalPages = Math.ceil(filteredMesses.length / rowsPerPage);

    const convertToCSV = (data: MessMaster[]) => {
        const csvRows = [
            ['ID', 'Project ID', 'Mess Name', 'Manager ID', 'Status', 'Created By', 'Updated By'],
            ...data.map(mess => [
                mess.id.toString(),
                mess.project_Id.toString(),
                mess.messName,
                mess.managerId.toString(),
                mess.status ? 'True' : 'False',
                mess.createdBy,
                mess.updatedBy
            ])
        ];

        return csvRows.map(row => row.join(',')).join('\n');
    };

    const downloadCSV = () => {
        const csvData = convertToCSV(messes);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'Messes.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="container">
            <div className="d-flex bg-white p-2 my-2 justify-content-between align-items-center">
                <span><i className="ri-file-list-line me-2"></i><span className='fw-bold'>Messes List</span></span>
                <div className="d-flex">
                    <div className="app-search d-none d-lg-block me-4">
                        <form>
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search mess..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                                <span className="ri-search-line search-icon text-muted" />
                            </div>
                        </form>
                    </div>
                    <Button variant="primary" onClick={handleShow} className="me-2">
                        Add Mess
                    </Button>
                    <Button variant="primary" onClick={downloadCSV} className="me-2">
                        Download CSV
                    </Button>
                </div>
            </div>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Mess Form</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="messName" className="mb-3">
                            <Form.Label>Mess Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="messName"
                                value={mess.messName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="project_Id" className="mb-3">
                            <Form.Label>Project ID:</Form.Label>
                            <Form.Control
                                type="number"
                                name="project_Id"
                                value={mess.project_Id}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="managerId" className="mb-3">
                            <Form.Label>Manager ID:</Form.Label>
                            <Form.Control
                                type="number"
                                name="managerId"
                                value={mess.managerId}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="status" className="mb-3">
                            <Form.Label>Status:</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="status"
                                checked={mess.status}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="createdBy" className="mb-3">
                            <Form.Label>Created By:</Form.Label>
                            <Form.Control
                                type="text"
                                name="createdBy"
                                value={mess.createdBy}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="updatedBy" className="mb-3">
                            <Form.Label>Updated By:</Form.Label>
                            <Form.Control
                                type="text"
                                name="updatedBy"
                                value={mess.updatedBy}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>

            <div className="d-flex justify-content-between align-items-center my-2">
                <div>
                    <Form.Select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                        <option value={5}>5 rows</option>
                        <option value={10}>10 rows</option>
                        <option value={20}>20 rows</option>
                    </Form.Select>
                </div>
                <Pagination>
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>

            <div className="overflow-auto">


                {loading ? (
                    <div className='loader-container'>
                        <div className="loader"></div>
                        <div className='mt-2'>Please Wait!</div>
                    </div>
                ) : (
                    <Table className='bg-white' striped bordered hover>
                        <thead>
                            <tr>
                                <th>Mess Name</th>
                                <th>Project ID</th>
                                <th>Manager ID</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMesses.map((mess, index) => (
                                <tr key={index}>
                                    <td>{mess.messName}</td>
                                    <td>{mess.project_Id}</td>
                                    <td>{mess.managerId}</td>
                                    <td>{mess.status ? 'Active' : 'Inactive'}</td>
                                    <td>
                                        <i className='btn ri-edit-line' onClick={() => handleEdit(index)}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </div>
>>>>>>> sumit-dev
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='row m-0'>
        <Form className='row col-md-12 p-2 bg-white rounded align-items-end m-0' onSubmit={handleFormSubmit}>
          <Form.Group className='col-md-3 my-1'>
            <Form.Label>Select Module</Form.Label>
            <Form.Control
              as="select"
              name="ModuleName"
              value={formData.ModuleName}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Modules</option>
              {['Accounts', 'Procurement', 'Business Development', 'Mechanical', 'Mobilization'].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className='col-md-3 my-1'>
            <Form.Label>Select Process</Form.Label>
            <Form.Control
              as="select"
              name="processes"
              value={formData.processes}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Process</option>
              {['Mess Weekly Payments', 'Mess Monthly Reconciliation', 'Monthly Budget FR [PNC]', 'Credit and Debit balance resolution', 'Bill Processing at HO'].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className='col-md-3 my-1'>
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleFormChange}
              required
              placeholder='Enter Task Name'
            />
          </Form.Group>
          <div className="d-flex col-md-3 justify-content-end">
            <Button variant="primary" type="submit" style={{ height: 'max-content' }}>
              Add Task Details
            </Button>
          </div>
        </Form>

        <div className="col-md-12 p-2 bg-white my-1">
          <h4>Available Fields</h4>
          <Droppable droppableId="inventory">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="row">
                {inventory.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <div className='' style={{ width: 'max-content' }}>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card my-1 drag-field"
                        >
                          {field.labeltext}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="row bg-white p-2 rounded m-0">
          <div className='col-12'>
            <h4>Build Your Task</h4>
            <Droppable droppableId="taskFields">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="list-group row flex-row m-0">
                  {taskFields.map((field, index) => (
                    <Draggable key={field.id} draggableId={field.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="list-group-item col-md-6 col-sm-12 border-none my-1 p-1"
                          style={{ border: '1px' }}
                        >
                          {renderField(field, -1, index)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <Form.Group className='col-6 my-1'>
            <Form.Label>Set Finish Point</Form.Label>
            <Form.Control
              as="select"
              name="processes"
              value={formData.processes}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Field</option>
              {taskFields.map((field, index) => (
                <option key={index} value={field.labeltext}>
                  {field.labeltext}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
      </div>
      <div className="d-flex justify-content-end p-2 col-12">
        <Button variant="primary" onClick={handleSaveTask}>
          Save Task
        </Button>
      </div>
    </DragDropContext>
  );
};

<<<<<<< HEAD
export default YourComponent;
=======
export default MessMasterComponent;
>>>>>>> sumit-dev

import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axiosInstance from '@/utils/axiosInstance';
import config from "@/config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "@/common";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

interface ProductDetails {
    id: number;
    productName: string;
    departmentName: string;
    launchRequestDate: string;
    launchDescription: string;
    launchDate: string;
    isLaunched: number;
}

interface ProcessCanvasProps {
    show: boolean;
    setShow: (show: boolean) => void;
    dataItem: ProductDetails | any;
}

const LaunchPop: React.FC<ProcessCanvasProps> = ({ show, setShow, dataItem }) => {
    const { user } = useAuthContext();
    const [projects, setProjects] = useState<ProductDetails>({
        id: 0,
        productName: '',
        departmentName: '',
        launchRequestDate: '',
        launchDate: '',
        launchDescription: '',
        isLaunched: 0,
    });

    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (show && dataItem) {
            setProjects(dataItem);
        }
    }, [show, dataItem]);

    const handleClose = () => {
        setShow(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        } else {
            setFile(null);
        }
    };

    const uploadFile = async () => {
        if (!file) {
            toast.error("Please upload a file before submitting.");
            return null;
        }

        const formData = new FormData();
        formData.append("ProductID", projects.id.toString());
        formData.append("ProductType", "Launch Document");
        formData.append("ProductName", projects.productName);
        formData.append("Files", file);
        formData.append("CreatedBy", `${user?.employeeName ?? "Unknown Employee"} - ${user?.userName ?? "Unknown User"}`);
        formData.append("UpdatedBy", `${user?.employeeName ?? "Unknown Employee"} - ${user?.userName ?? "Unknown User"}`);

        try {
            const uploadUrl = `${config.API_URL}/UploadDocument/UploadFileforLaunch`;
            const response = await axiosInstance.post(uploadUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.status === 200) {
                toast.success("File uploaded successfully.");
                return response.data; // Returning API response for next step
            } else {
                toast.error(response.data.message || "File upload failed.");
                return null;
            }
        } catch (error: any) {
            toast.error(error.message || "Error uploading file.");
            console.error("File upload error:", error);
            return null;
        }
    };

    const updateLaunchDate = async () => {
        const payload = {
            productID: projects?.id ?? null,
            launchRequestDate: new Date().toLocaleDateString('en-CA'),
            launchDate: projects?.launchDate ?? null,
            launchDescription: projects?.launchDescription ?? "",
            updatedBy: `${user?.employeeName ?? "Unknown Employee"} - ${user?.userName ?? "Unknown User"}`,
        };

        try {
            const apiUrl = `${config.API_URL}/Product/UpdateLaunchDate`;
            const response = await axiosInstance.post(apiUrl, payload);

            if (response.status === 200) {
                toast.success(response.data.message || "Product Launched Successfully");
                setShow(false);
            } else {
                toast.error(response.data.message || "Failed to process request");
            }
        } catch (error: any) {
            toast.error(error.message || "Error in Launching Product");
            console.error("Launch update error:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.dismiss();

        if (file) {
            const uploadResponse = await uploadFile();
            if (uploadResponse) {
                await updateLaunchDate();
            }
        } else {
            await updateLaunchDate();
        }
    };

    return (
        <div>
            <Modal className="p-2" show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="text-dark">Request for Product Launch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-2">
                            <Col lg={6}>
                                <span className="text-primary fs-16 fw-bold">Product:</span>
                                <span className="text-dark"> {projects.productName}</span>
                            </Col>
                            <Col lg={6}>
                                <span className="text-primary fs-16 fw-bold">Department:</span>
                                <span className="text-dark"> {projects.departmentName}</span>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Go Live Date</Form.Label>
                            <Flatpickr
                                value={projects.launchDate || ''}
                                onChange={([date]) => {
                                    if (date) {
                                        const formattedDate = date.toLocaleDateString('en-CA');
                                        setProjects({
                                            ...projects,
                                            launchDate: formattedDate,
                                        });
                                    }
                                }}
                                options={{
                                    enableTime: false,
                                    dateFormat: "Y-m-d",
                                    time_24hr: false,
                                }}
                                placeholder="Start Date"
                                className={" form-control "}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={projects.launchDescription}
                                onChange={(e) => setProjects({ ...projects, launchDescription: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Upload File</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".pdf,.doc,.docx,.xlsx,.txt"
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Col className="d-flex justify-content-end">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LaunchPop;

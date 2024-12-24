import React, { useState, useEffect } from 'react';
import { Container, Modal, Form, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import Sidenav from '../Components/Sidenav'; // Adjust the import path as necessary

const Category = () => {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryCode, setCategoryCode] = useState('');
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [isSidebarCollapsed] = useState(true); 
    
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/categories/getCategories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const resetForm = () => {
        setCategoryName('');
        setCategoryCode('');
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleSave = async () => {
        if (categoryName && categoryCode) {
            if (isEditing) {
                try {
                    await axios.put(`http://localhost:7000/api/categories/updateCategory/${currentId}`, {
                        categoryname: categoryName,
                        categorycode: categoryCode,
                    });
                    fetchCategories();  
                    resetForm();
                    setShow(false);
                } catch (error) {
                    console.error('Error updating category:', error);
                }
            } else {
                try {
                    await axios.post('http://localhost:7000/api/categories/createCategory', {
                        categoryname: categoryName,
                        categorycode: categoryCode,
                    });
                    fetchCategories();  
                    resetForm();
                    setShow(false);
                } catch (error) {
                    console.error('Error adding category:', error);
                }
            }
        }
    };

    const handleEdit = (id, name, code) => {
        setIsEditing(true);
        setCurrentId(id);
        setCategoryName(name);
        setCategoryCode(code);
        setShow(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:7000/api/categories/deleteCategory/${id}`);
            fetchCategories();  
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleStatusChange = async (id, event) => {
        const status = event.target.value;
        try {
            await axios.put(`http://localhost:7000/api/categories/updateCategory/${id}`, { status });
            fetchCategories();  
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="d-flex">
            <Sidenav isCollapsed={isSidebarCollapsed} /> {/* Sidebar component */}

            <Container style={{ marginLeft: isSidebarCollapsed ? '0px' : '10px', transition: 'margin-left 0.3s' }}>
                <div style={{ position: 'relative', marginBottom: '20px', marginTop: '150px' }}> {/* Adjusted marginTop */}
                    <Button variant="primary" onClick={handleShow} style={{ position: 'absolute', top: -45, right: 0 }}>
                         Add New Category
                    </Button>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Update Category' : 'Add Category'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formCategoryName">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCategoryCode">
                                <Form.Label>Category Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category code"
                                    value={categoryCode}
                                    onChange={(e) => setCategoryCode(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            {isEditing ? 'Update' : 'Save'}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Table striped bordered hover className="mt-5" style={{ marginTop: '100px' }}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Category Name</th>
                            <th>Category Code</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((cat, index) => (
                                <tr key={cat._id}>
                                    <td>{index + 1}</td>
                                    <td>{cat.categoryname}</td>
                                    <td>{cat.categorycode}</td>
                                    <td>
                                        <Form.Control
                                            as="select"
                                            value={cat.status || 'Active 0'}
                                            onChange={(e) => handleStatusChange(cat._id, e)}
                                        >
                                            <option>Active 0</option>
                                            <option>Active 1</option>
                                        </Form.Control>
                                    </td>
                                    <td>
                                        <Button variant="warning" className="me-2" onClick={() => handleEdit(cat._id, cat.categoryname, cat.categorycode)}>
                                            Update
                                        </Button>&nbsp;&nbsp;&nbsp;
                                        <Button variant="danger" onClick={() => handleDelete(cat._id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No categories found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Category;


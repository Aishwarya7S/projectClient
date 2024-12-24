import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import Sidenav from '../Components/Sidenav'; // Adjust the import path as necessary

const Subcategory = () => {
    const [show, setShow] = useState(false);
    const [subcategoryName, setSubcategoryName] = useState('');
    const [subcategoryCode, setSubcategoryCode] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/categories/getCategories');
            setCategories(response.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchSubcategories = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/subcategories/getSubcategories');
            setSubcategories(response.data || []);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const resetForm = () => {
        setSubcategoryName('');
        setSubcategoryCode('');
        setSelectedCategory('');
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleSave = async () => {
        if (subcategoryName && subcategoryCode && selectedCategory) {
            const selectedCat = categories.find(cat => cat._id === selectedCategory);
            const categoryName = selectedCat ? selectedCat.categoryname : '';
            const categoryCode = selectedCat ? selectedCat.categorycode : '';

            try {
                if (isEditing && currentId) {
                    await axios.put(`http://localhost:7000/api/subcategories/updateSubcategory/${currentId}`, {
                        categoryId: selectedCategory,
                        categoryName, 
                        categoryCode,
                        subcategoryName, 
                        subcategoryCode, 
                    });
                } else {
                    await axios.post('http://localhost:7000/api/subcategories/createSubcategory', {
                        categoryId: selectedCategory,
                        categoryName, 
                        categoryCode,
                        subcategoryName, 
                        subcategoryCode, 
                    });
                }
                fetchSubcategories();  
                resetForm();
                setShow(false);
            } catch (error) {
                console.error('Error saving subcategory:', error);
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleEdit = (id, name, code, categoryId) => {
        setCurrentId(id);
        setSubcategoryName(name);
        setSubcategoryCode(code);
        setSelectedCategory(categoryId);
        setIsEditing(true);
        handleShow();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this subcategory?")) {
            try {
                await axios.delete(`http://localhost:7000/api/subcategories/deleteSubcategory/${id}`);
                fetchSubcategories();  
            } catch (error) {
                console.error('Error deleting subcategory:', error);
            }
        }
    };

    return (
        <div className="d-flex">
            <Sidenav  /> 

            <Container >
                <div style={{ position: 'relative', marginBottom: '20px', marginTop: '100px' }}> {/* Adjusted marginTop */}
                    <Button variant="primary" onClick={handleShow} className="mb-3" style={{ float: 'right' }}>
                         Add New Subcategory
                    </Button>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Update Subcategory' : 'Add Subcategory'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formCategorySelect">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.categoryname} ({cat.categorycode})
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formSubcategoryName">
                                <Form.Label>Subcategory Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter subcategory name"
                                    value={subcategoryName}
                                    onChange={(e) => setSubcategoryName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formSubcategoryCode">
                                <Form.Label>Subcategory Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter subcategory code"
                                    value={subcategoryCode}
                                    onChange={(e) => setSubcategoryCode(e.target.value)}
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

                <Table striped bordered hover className="mt-5">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Category Name</th>
                            <th>Category Code</th>
                            <th>Subcategory Name</th>
                            <th>Subcategory Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcategories.length > 0 ? (
                            subcategories.map((subcat, index) => (
                                <tr key={subcat._id}>
                                    <td>{index + 1}</td>
                                    <td>{subcat.categoryName}</td>
                                    <td>{subcat.categoryCode}</td>
                                    <td>{subcat.subcategoryName}</td>
                                    <td>{subcat.subcategoryCode}</td>
                                    <td>
                                        <Button variant="warning" className="me-2" onClick={() => handleEdit(subcat._id, subcat.subcategoryName, subcat.subcategoryCode, subcat.categoryId)}>
                                            Update
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(subcat._id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No subcategories found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Subcategory;

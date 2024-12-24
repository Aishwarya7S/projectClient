import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Table, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Sidenav from '../Components/Sidenav';

const Inventory = () => {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');
    const [productName, setProductName] = useState('');
    const [cost, setCost] = useState('');
    const [markedPrice, setMarkedPrice] = useState('');
    const [minLevel, setMinLevel] = useState('');
    const [minOrder, setMinOrder] = useState('');
    const [hsnCode, setHsnCode] = useState('');
    const [gst, setGst] = useState('');
    const [quantity, setQuantity] = useState('');
    const [inventories, setInventories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [isSidebarCollapsed] = useState(true);

    useEffect(() => {
        fetchInventories();
    }, []);

    const fetchInventories = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/inventories/getInventories');
            setInventories(response.data);
        } catch (error) {
            console.error('Error fetching inventories:', error);
        }
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const resetForm = () => {
        setCategoryName('');
        setSubcategoryName('');
        setProductName('');
        setCost('');
        setMarkedPrice('');
        setMinLevel('');
        setMinOrder('');
        setHsnCode('');
        setGst('');
        setQuantity('');
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleSave = async () => {
        if (categoryName && subcategoryName && productName) {
            const newInventory = {
                categoryName,
                subcategoryName,
                productName,
                cost,
                markedPrice,
                minLevel,
                minOrder,
                hsnCode,
                gst,
                quantity
            };

            try {
                if (isEditing) {
                    await axios.put(`http://localhost:7000/api/inventories/updateInventory/${currentId}`, newInventory);
                } else {
                    await axios.post('http://localhost:7000/api/inventories/createInventory', newInventory);
                }
                fetchInventories();
                resetForm();
                setShow(false);
            } catch (error) {
                console.error('Error saving inventory:', error);
            }
        }
    };

    const handleEdit = (inventory) => {
        setIsEditing(true);
        setCurrentId(inventory._id);
        setCategoryName(inventory.categoryName);
        setSubcategoryName(inventory.subcategoryName);
        setProductName(inventory.productName);
        setCost(inventory.cost);
        setMarkedPrice(inventory.markedPrice);
        setMinLevel(inventory.minLevel);
        setMinOrder(inventory.minOrder);
        setHsnCode(inventory.hsnCode);
        setGst(inventory.gst);
        setQuantity(inventory.quantity);
        setShow(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this inventory item?")) {
            try {
                await axios.delete(`http://localhost:7000/api/inventories/deleteInventory/${id}`);
                fetchInventories();
            } catch (error) {
                console.error('Error deleting inventory:', error);
            }
        }
    };

    return (
        <div className='d-flex'>
            <Sidenav isCollapsed={isSidebarCollapsed} />
            <Container style={{ marginLeft: isSidebarCollapsed ? '0px' : '20px', transition: 'margin-left 0.3s' }}>
                <div style={{ position: 'relative', marginBottom: '20px', marginTop: '100px' }}>
                    <Button variant="primary" onClick={handleShow} className="mb-3" style={{ float: 'right' }}>
                        Add New Inventory
                    </Button>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Update Inventory' : 'Add Inventory'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formCategoryName">
                                        <Form.Label>Category Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter category name"
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formSubCategoryName">
                                        <Form.Label>Subcategory Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter subcategory name"
                                            value={subcategoryName}
                                            onChange={(e) => setSubcategoryName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formProductName">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter product name"
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formCost">
                                        <Form.Label>Cost</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter cost"
                                            value={cost}
                                            onChange={(e) => setCost(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formMarkedPrice">
                                        <Form.Label>Marked Price</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter marked price"
                                            value={markedPrice}
                                            onChange={(e) => setMarkedPrice(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formMinLevel">
                                        <Form.Label>Minimum Level</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter minimum level"
                                            value={minLevel}
                                            onChange={(e) => setMinLevel(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formMinOrder">
                                        <Form.Label>Minimum Order</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter minimum order"
                                            value={minOrder}
                                            onChange={(e) => setMinOrder(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formHsnCode">
                                        <Form.Label>HSN Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter HSN code"
                                            value={hsnCode}
                                            onChange={(e) => setHsnCode(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formGst">
                                        <Form.Label>GST</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter GST percentage"
                                            value={gst}
                                            onChange={(e) => setGst(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formQuantity">
                                        <Form.Label>Quantity (Unit)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
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

                <Table striped bordered hover className="mt-5" style={{ width: '100%', margin: '0 auto' }}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Category Name</th>
                            <th>Subcategory Name</th>
                            <th>Product Name</th>
                            <th>Cost</th>
                            <th>Marked Price</th>
                            <th>Min Level</th>
                            <th>Min Order</th>
                            <th>HSN Code</th>
                            <th>GST</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventories.length > 0 ? (
                            inventories.map((inv, index) => (
                                <tr key={inv._id}>
                                    <td>{index + 1}</td>
                                    <td>{inv.categoryName}</td>
                                    <td>{inv.subcategoryName}</td>
                                    <td>{inv.productName}</td>
                                    <td>{inv.cost}</td>
                                    <td>{inv.markedPrice}</td>
                                    <td>{inv.minLevel}</td>
                                    <td>{inv.minOrder}</td>
                                    <td>{inv.hsnCode}</td>
                                    <td>{inv.gst}</td>
                                    <td>{inv.quantity}</td>
                                    <td>
                                        <Button variant="warning" size="sm" onClick={() => handleEdit(inv)}>Update</Button>{' '}
                                        <Button variant="danger" size="sm" className='mt-1' onClick={() => handleDelete(inv._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12" className="text-center">No inventory items found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Inventory;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import Sidenav from '../Components/Sidenav';
import axios from 'axios';

const StockOut = () => {
  const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [batchCode, setBatchCode] = useState('');
  const [availableQty, setAvailableQty] = useState('');
  const [transferQty, setTransferQty] = useState('');
  const [gstPercent, setGstPercent] = useState('');
  const [mrp, setMrp] = useState('');
  const [price, setPrice] = useState('');
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch stock-out data
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/exits/getItems');
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Add or update item
  const handleAddItem = async () => {
    if (!itemCode || !itemName || !batchCode || !transferQty || !mrp || !price) {
      setError("Please fill all required fields.");
      return;
    }

    const newItem = {
      billDate,
      location,
      itemCode,
      itemName,
      batchCode,
      availableQty,
      transferQty,
      gstPercent,
      mrp,
      price,
    };

    try {
      if (editingItem) {
        // Update item
        const response = await axios.put(`http://localhost:7000/api/exits/updateItem/${editingItem._id}`,newItem
        );
        setTableData(tableData.map((i) =>i._id === editingItem._id ? response.data : i));
        setEditingItem(null);
      } else {
        // Add new item
        const response = await axios.post('http://localhost:7000/api/exits/createItem', newItem);
        setTableData([...tableData, response.data]);
      }
      resetFields();
    } catch (error) {
      setError(editingItem ? "Error updating item." : "Error adding item.");
    }
  };

  // Edit item
  const handleUpdateItem = (item) => {
    setBillDate(item.billDate);
    setLocation(item.location);
    setItemCode(item.itemCode);
    setItemName(item.itemName);
    setBatchCode(item.batchCode);
    setAvailableQty(item.availableQty);
    setTransferQty(item.transferQty);
    setGstPercent(item.gstPercent);
    setMrp(item.mrp);
    setPrice(item.price);
    setEditingItem(item);
  };

  // Delete item
  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:7000/api/exits/deleteItem/${itemId}`);
      setTableData(tableData.filter((item) => item._id !== itemId));
    } catch (error) {
      setError("Error deleting item.");
    }
  };

  // Reset input fields
  const resetFields = () => {
    setBillDate(new Date().toISOString().split('T')[0]);
    setLocation('');
    setItemCode('');
    setItemName('');
    setBatchCode('');
    setAvailableQty('');
    setTransferQty('');
    setGstPercent('');
    setMrp('');
    setPrice('');
    setEditingItem(null);
    setError(null);
  };

  return (
    <div className="d-flex">
    <Sidenav />
    <Container fluid className="mt-1">
      <Row style={{ marginTop: '7rem'}}>
        <Col md={3}>
        <Form.Floating>
            <Form.Control
              type="date"
              placeholder=" "
              value={billDate}
              onChange={(e) => setBillDate(e.target.value)}
              required
            />
            <Form.Label>Bill Date</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={4}>
          <Form.Floating>
            <Form.Control
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Form.Label>Location</Form.Label>
          </Form.Floating>
        </Col>
      </Row>
      
      {/* Second Row: Item Details */}
      <Row className="mt-3">
        <Col md={3}>
          <Form.Floating>
            <Form.Control
              type="text"
              placeholder="Enter Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Form.Label>Item Name</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={2}>
          <Form.Floating>
            <Form.Control
              type="text"
              placeholder="Enter Item Code"
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
            />
            <Form.Label>Item Code</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={2}>
          <Form.Floating>
            <Form.Control
              type="text"
              placeholder="Enter Batch Code"
              value={batchCode}
              onChange={(e) => setBatchCode(e.target.value)}
            />
            <Form.Label>Batch Code</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={2}>
          <Form.Floating>
            <Form.Control
              type="number"
              placeholder="Available Qty"
              value={availableQty}
              onChange={(e) => setAvailableQty(e.target.value)}
            />
            <Form.Label>Available Qty</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={2}>
          <Form.Floating>
            <Form.Control
              type="number"
              placeholder="Transfer Qty"
              value={transferQty}
              onChange={(e) => setTransferQty(e.target.value)}
            />
            <Form.Label>Transfer Qty</Form.Label>
          </Form.Floating>
        </Col>
      </Row>
      
      <Row className="mt-3">
        <Col md={2}>
          <Form.Floating>
            <Form.Control
              type="number"
              placeholder="GST%"
              value={gstPercent}
              onChange={(e) => setGstPercent(e.target.value)}
            />
            <Form.Label>GST%</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={2}>
          <Form.Floating>
            <Form.Control
              type="number"
              placeholder="MRP"
              value={mrp}
              onChange={(e) => setMrp(e.target.value)}
            />
            <Form.Label>MRP</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={2}>
          <Form.Floating>
            <Form.Control
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Form.Label>Price</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={2} className='mt-2'>
          <Button variant="primary" onClick={handleAddItem}>
            {editingItem !== null ? 'Update' : 'Add'}
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <Table striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Batch Code</th>
            <th>Available Qty</th>
            <th>Transfer Qty</th>
            <th>GST%</th>
            <th>MRP</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.itemCode}</td>
                <td>{item.itemName}</td>
                <td>{item.batchCode}</td>
                <td>{item.availableQty}</td>
                <td>{item.transferQty}</td>
                <td>{item.gstPercent}</td>
                <td>{item.mrp}</td>
                <td>{item.price}</td>
                <td>
                  <Button variant="warning" onClick={() => handleUpdateItem(item)}>Update</Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteItem(item._id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">No items added yet.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {error && <Alert variant="danger">{error}</Alert>}
    </Container>
  </div>
);
};


export default StockOut;

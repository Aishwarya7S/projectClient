import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, InputGroup, Alert } from 'react-bootstrap';
import Sidenav from '../Components/Sidenav';
import axios from 'axios';

const StockInward = () => {
  const [stockType, setStockType] = useState('');
  const [billNumber, setBillNumber] = useState('');
  const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]);
  const [vendorName, setVendorName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [gstValue, setGstValue] = useState('');
  const [cessValue, setCessValue] = useState('');
  const [grandTotalA, setGrandTotalA] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mrp, setMrp] = useState('');
  const [cost, setCost] = useState('');
  const [gstPercent, setGstPercent] = useState('');
  const [cessPercent, setCessPercent] = useState('');
  const [discount, setDiscount] = useState('');
  const [grandTotalB, setGrandTotalB] = useState('');
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/items/getItems');
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Add new item or update existing item
  const handleSaveItem = async () => {
    const newItem = {
      billNumber,
      billDate,
      productCode,
      vendorName,
      itemCode,
      itemName,
      quantity,
      mrp,
      cost,
      gstPercent,
      cessPercent,
      discount,
      total: parseFloat(mrp) + parseFloat(cost) - parseFloat(discount || 0),
    };

    try {
      if (editingItem) {
        // Update item
        const response = await axios.put(`http://localhost:7000/api/items/updateItem/${editingItem._id}`, newItem);
        const updatedData = tableData.map((i) => (i._id === editingItem._id ? response.data : i));
        setTableData(updatedData);
        setEditingItem(null); // Reset editing item
      } else {
        // Add new item
        const response = await axios.post('http://localhost:7000/api/items/createItem', newItem);
        setTableData([...tableData, response.data]);
      }
      resetFields();
    } catch (error) {
      setError(editingItem ? 'Error updating item.' : 'Error adding item.');
    }
  };

  // Prepare to edit item
  const handleUpdateItem = (item) => {
    setBillNumber(item.billNumber);
    setBillDate(item.billDate);
    setProductCode(item.productCode);
    setVendorName(item.vendorName);
    setItemCode(item.itemCode);
    setItemName(item.itemName);
    setQuantity(item.quantity);
    setMrp(item.mrp);
    setCost(item.cost);
    setGstPercent(item.gstPercent);
    setCessPercent(item.cessPercent);
    setDiscount(item.discount);
    setEditingItem(item);
  };

  // Delete item
  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:7000/api/items/deleteItem/${itemId}`);
      const filteredData = tableData.filter((item) => item._id !== itemId);
      setTableData(filteredData);
    } catch (error) {
      setError('Error deleting item.');
    }
  };

  const resetFields = () => {
    setBillNumber('');
    setBillDate('');
    setProductCode('');
    setVendorName('');
    setTotalValue('');
    setGstValue('');
    setCessValue('');
    setItemCode('');
    setItemName('');
    setQuantity('');
    setMrp('');
    setCost('');
    setGstPercent('');
    setCessPercent('');
    setDiscount('');
    setGrandTotalA('');
    setGrandTotalB('');
  };

  return (
    <div className="d-flex">
      <Sidenav  />
      <Container fluid>
        <Form.Floating className="mb-1" style={{ marginTop: '7rem', width: '13rem' }}>
          <Form.Select
            value={stockType}
            onChange={(e) => setStockType(e.target.value)}
            required
          >
            <option value="">Select Stock Type</option>
            <option value="own product">Own Product</option>
            <option value="other product">Others Product</option>
          </Form.Select>
          <Form.Label>Stock Type</Form.Label>
        </Form.Floating>

        {/* Bill Information */}
        <Row className='mt-2'>
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="text"
                placeholder=" "
                value={billNumber}
                onChange={(e) => setBillNumber(e.target.value)}
                required
              />
              <Form.Label>Bill Number</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={2}>
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
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="text"
                placeholder=" "
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                required
              />
              <Form.Label>Product Code</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="text"
                placeholder=" "
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                required
              />
              <Form.Label>Vendor Name</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="number"
                placeholder=" "
                value={totalValue}
                onChange={(e) => setTotalValue(e.target.value)}
                required
              />
              <Form.Label>Total Value</Form.Label>
            </Form.Floating>
          </Col>
        </Row>
        <Row className='mt-3'>

          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="number"
                placeholder=" "
                value={gstValue}
                onChange={(e) => setGstValue(e.target.value)}
                required
              />
              <Form.Label>GST Value</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="number"
                placeholder=" "
                value={cessValue}
                onChange={(e) => setCessValue(e.target.value)}
                required
              />
              <Form.Label>CESS Value</Form.Label>
            </Form.Floating>
          </Col>

          <Col md={4} className='mt-2'>
            <InputGroup>
              <InputGroup.Text>Grand Total</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder=" "
                value={grandTotalA}
                onChange={(e) => setGrandTotalA(e.target.value)}
                required
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Inventory Table */}
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Bill Code</th>
              <th>Bill Date</th>
              <th>Product Code</th>
              <th>Vendor Name</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>MRP</th>
              <th>Cost</th>
              <th>Discount</th>
              <th>GST%</th>
              <th>CESS%</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.billNumber}</td>
                  {/* <td>{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(new Date(item.billDate))}</td> */}
                  <td>{new Date(item.billDate).toISOString().split('T')[0]}</td>
                  <td>{item.productCode}</td>
                  <td>{item.vendorName}</td>
                  <td>{item.itemCode}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.mrp}</td>
                  <td>{item.cost}</td>
                  <td>{item.discount}</td>
                  <td>{item.gstPercent}</td>
                  <td>{item.cessPercent}</td>
                  <td>{item.total}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleUpdateItem(item)}>Update</Button>&nbsp;&nbsp;&nbsp;
                    <Button variant="danger" onClick={() => handleDeleteItem(item._id)}>Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="text-center">No items found.</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Row className="mt-3">
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="text"
                placeholder=" "
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
                required
              />
              <Form.Label>Item Code</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="text"
                placeholder=" "
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
              <Form.Label>Item Name</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="number"
                placeholder=" "
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <Form.Label>Quantity</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="number"
                placeholder=" "
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                required
              />
              <Form.Label>MRP</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="number"
                placeholder=" "
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              />
              <Form.Label>Cost</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="number"
                placeholder=" "
                value={gstPercent}
                onChange={(e) => setGstPercent(e.target.value)}
                required
              />
              <Form.Label>GST%</Form.Label>
            </Form.Floating>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="number"
                placeholder=" "
                value={cessPercent}
                onChange={(e) => setCessPercent(e.target.value)}
                required
              />
              <Form.Label>CESS%</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={2}>
            <Form.Floating>
              <Form.Control
                type="number"
                placeholder=" "
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
              <Form.Label>Discount</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={4} className='mt-2'>
            <InputGroup>
              <InputGroup.Text>Grand Total</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder=" "
                value={grandTotalB}
                onChange={(e) => setGrandTotalB(e.target.value)}
                required
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <Button variant="primary" onClick={handleSaveItem}>
              {editingItem ? 'Update Item' : 'Add Item'}
            </Button>
          </Col>
        </Row>


        <Row className='mt-3 align-items-center'>
          <Col md={6}>
            <Button
              variant="success"
              onClick={handleSaveItem}
              disabled={grandTotalA !== grandTotalB}
            >
              Save
            </Button>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
    </div>
  );
};

export default StockInward;

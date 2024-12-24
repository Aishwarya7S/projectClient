import React, { useState, useEffect } from 'react';
import { Container, Form, Table, Button } from 'react-bootstrap';
import Sidenav from '../Components/Sidenav';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Report = () => {
  const [reportType, setReportType] = useState('');
  const [data, setData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

  useEffect(() => {
    if (reportType) {
      fetchData(reportType);
    }
  }, [reportType]);
  const getTableWidth = () => {
    if (reportType === 'Inventory' || reportType === 'StockIn') {
      return '95%'; 
    }
    return '80%';
  };


  const fetchData = async (type) => {
    let url = '';
    let headers = [];
    let keyMap = {}; 
    switch (type) {
      case 'Category':
        url = 'http://localhost:7000/api/categories/getCategories';
        headers = ['S.No', 'Category Name', 'Category Code', 'Status'];
        keyMap = {
          'Category Name': 'categoryname',
          'Category Code': 'categorycode',
          'Status': 'status',
        };
        break;
      case 'Subcategory':
        url = 'http://localhost:7000/api/subcategories/getSubcategories';
        headers = ['S.No', 'Category Code', 'Category Name', 'Subcategory Code', 'Subcategory Name'];
        keyMap = {
          'Category Code': 'categoryCode',
          'Category Name': 'categoryName',
          'Subcategory Code': 'subcategoryCode',
          'Subcategory Name': 'subcategoryName',
        };
        break;
      case 'Inventory':
        url = 'http://localhost:7000/api/inventories/getInventories';
        headers = [
          'S.No', 'Category Name', 'Subcategory Name', 'Product Name', 'Cost',
          'Marked Price', 'Min Level', 'Min Order', 'HSN Code', 'GST', 'Quantity',
        ];
        keyMap = {
          'Category Name': 'categoryName',
          'Subcategory Name': 'subcategoryName',
          'Product Name': 'productName',
          'Cost': 'cost',
          'Marked Price': 'markedPrice',
          'Min Level': 'minLevel',
          'Min Order': 'minOrder',
          'HSN Code': 'hsnCode',
          'GST': 'gst',
          'Quantity': 'quantity',
        };
        break;
      case 'StockIn':
        url = 'http://localhost:7000/api/items/getItems';
        headers = [
          'S.No', 'Bill Code', 'Bill Date', 'Product Code', 'Vendor Name',
          'Item Code', 'Item Name', 'Quantity', 'Mrp', 'Cost', 'Discount', 'GST%',
          'CESS%', 'Total',
        ];
        keyMap = {
          'Bill Code': 'billNumber',
          'Bill Date': 'billDate',
          'Product Code': 'productCode',
          'Vendor Name': 'vendorName',
          'Item Code': 'itemCode',
          'Item Name': 'itemName',
          'Quantity': 'quantity',
          'Mrp': 'mrp',
          'Cost': 'cost',
          'Discount': 'discount',
          'GST%': 'gstPercent',
          'CESS%': 'cessPercent',
          'Total': 'total',
        };
        break;
      case 'StockOut':
        url = 'http://localhost:7000/api/exits/getItems';
        headers = [
          'S.No', 'Item Code', 'Item Name', 'Batch Code', 'Available Quantity',
          'Transfer Quantity', 'GST%', 'Mrp', 'Price',
        ];
        keyMap = {
          'Item Code': 'itemCode',
          'Item Name': 'itemName',
          'Batch Code': 'batchCode',
          'Available Quantity': 'availableQty',
          'Transfer Quantity': 'transferQty',
          'GST%': 'gstPercent',
          'Mrp': 'mrp',
          'Price': 'price',
        };
        break;
      default:
        break;
    }

    if (url) {
      try {
        const response = await axios.get(url);
        console.log(`${type} API Response:`, response.data); 
        const formattedData = response.data.map((item) => {
          const formattedRow = {};
          Object.keys(keyMap).forEach((header) => {
            if (type === 'StockIn' && header === 'Bill Date') {
              formattedRow[header] = item[keyMap[header]]
                ? new Date(item[keyMap[header]]).toISOString().split('T')[0]
                : '-';
            } else {
              formattedRow[header] = item[keyMap[header]] || '-';
            }
          });
          return formattedRow;
        });

        setData(formattedData);
        setTableHeaders(headers);
      } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        setData([]);
      }
    }
  };

  const handleDownload = () => {
    if (!data.length) {
      alert('No data available to download.');
      return;
    }

    const doc = new jsPDF();
    const title = `${reportType} List`;
    const tableRows = data.map((row, index) => {
      const rowValues = [index + 1];
      tableHeaders.slice(1).forEach((header) => {
        rowValues.push(row[header] || '-');
      });
      return rowValues;
    });

    doc.text(title, 14, 10);
    doc.autoTable({
      startY: 20,
      head: [tableHeaders],
      body: tableRows,
      theme: 'striped',
    });
    doc.save(`${title}.pdf`);
  };

  return (
    <>
      <div className="d-flex">
        <Sidenav />
        <Container style={{ marginTop:'7rem'}}>
          <h1 className="text-center mb-3">Reports</h1>
          <div className="d-flex flex-column align-items-center">
            <Form className="mb-4 d-flex align-items-center justify-content-center" style={{ width: '20rem' }}>
              <Form.Group controlId="reportType" className="d-flex align-items-center mb-0">
                <Form.Label className="me-2 mb-0">Select Report Type</Form.Label>
                <Form.Control
                  as="select"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value="">Choose</option>
                  <option value="Category">Category</option>
                  <option value="Subcategory">Subcategory</option>
                  <option value="Inventory">Inventory</option>
                  <option value="StockIn">Stock Inward </option>
                  <option value="StockOut">Stock Outward</option>
                </Form.Control>
              </Form.Group>
            </Form>

            {data.length > 0 && (
              <>
                <Table striped bordered hover className="mt-3" style={{ width: getTableWidth() }}>
                  <thead className="table-dark">
                    <tr>
                      {tableHeaders.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td>{rowIndex + 1}</td>
                        {tableHeaders.slice(1).map((header, colIndex) => (
                          <td key={colIndex}>{row[header] || '-'}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="text-end mt-3" style={{ width: '80%' }}>
                  <Button variant="success" onClick={handleDownload}>
                    Download
                  </Button>
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Report;

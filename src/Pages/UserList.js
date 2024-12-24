import React, { useEffect, useState } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState({ username: '', password: '' });
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:7000/api/users/getUsers');
        setUsers(response.data);
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const resetForm = () => {
        setCurrentUser({ username: '', password: '' });
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleSave = async () => {
        if (currentUser.username && currentUser.password) {
            try {
                if (isEditing) {
                    await axios.put(`http://localhost:7000/api/users/updateUser/${currentId}`, currentUser);
                } else {
                    await axios.post('http://localhost:7000/api/users/createUser', currentUser);
                }
                fetchUsers();
                resetForm();
                setShow(false);
            } catch (error) {
                console.error('Error saving user:', error);
            }
        }
    };

    const handleEdit = (user) => {
        setIsEditing(true);
        setCurrentId(user._id);
        setCurrentUser({ username: user.username, password: user.password });
        setShow(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:7000/api/users/deleteUser/${id}`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <Container>
            <Button variant="primary" onClick={handleShow} className="mt-3">
                Add User
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Update User' : 'Add User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={currentUser.username}
                                onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={currentUser.password}
                                onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
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
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>
                                    <Button variant="warning" size="sm" onClick={() => handleEdit(user)}>Update</Button>{' '}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default UserList;

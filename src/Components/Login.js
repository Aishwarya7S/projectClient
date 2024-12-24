import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { NavLink ,useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import vcewlogo from '../Assets/vcewlogo.png'; 
import { Userdata } from '../Lib/Userdata';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Submitted:', { username, password });
        Userdata.map((user)=>{
            if(username===user.email){
                if(password===user.pass){
                    alert("Login successfully")
                    setUsername("");
                    setPassword("");
                    navigate('/navbar')
                }else{
                    alert("Incorrect Password")
                }
            }else{
                alert("Incorrect Username")
            }
        })
    };

    return (
        <div style={{ backgroundColor: 'royalblue', minHeight: '100vh' }}> 
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Row className="w-100">
                    <Col md={4} className="mx-auto"> 
                        <div 
                            className="p-4 border rounded shadow" 
                            style={{ 
                                backgroundColor: 'white',  
                                color: 'black',             
                                borderRadius: '10px' 
                            }}>
                            
                            <div className="text-center mb-3">
                                <img src={vcewlogo} alt="Login Logo" style={{ width: '130px' }} />
                                <h2 style={{color:'darkblue', fontWeight: 'bolder'}}>VIVEKANANDHA</h2>
                                <h5 style={{color:'darkblue',fontWeight:'bold'}}>College of Engineering for Women</h5>
                            </div>

                            <h3 className="text-center mb-4" style={{fontFamily:'serif'}}>Login</h3>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4 position-relative" controlId="formUsername">
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        style={{
                                            paddingLeft: '40px',
                                            borderRadius: '30px',
                                            backgroundColor: 'transparent',
                                            color: 'black',
                                            border: '2px solid black',
                                            maxWidth: '100%',
                                        }}
                                    />
                                    <FaUser 
                                        className="position-absolute" 
                                        style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px',color:'#3e3534' }} 
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4 position-relative" controlId="formPassword">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{
                                            paddingLeft: '40px',
                                            borderRadius: '30px',
                                            backgroundColor: 'transparent',
                                            color: 'black',
                                            border: '2px solid black',
                                            maxWidth: '100%',
                                        }}
                                    />
                                    <FaLock 
                                        className="position-absolute" 
                                        style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px',color:'#3e3534' }} 
                                    />
                                </Form.Group>

                                <Form.Group className="d-flex justify-content-between mb-3">
                                    <Form.Check type="checkbox" label="Remember me" style={{ color: 'black'}} />
                                    <NavLink to='/forgot-password' style={{ color: 'black', textDecoration: 'none' }}>
                                        Forgot password?
                                    </NavLink>
                                </Form.Group>

                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="w-100 mb-3" 
                                    style={{
                                        borderRadius: '30px',
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}>
                                    Login
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;

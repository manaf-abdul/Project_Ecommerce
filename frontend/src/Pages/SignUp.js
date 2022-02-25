import React, { useState, useEffect } from 'react';
// import './Signin.css'
import { Button, Form,Row,Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../components/Message';
import Loader from '../components/Loader';

const SignUp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [refferalId, setRefferalId] = useState('')

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        // console.log(email,password)
        if (password !== confirmpassword) {
            setMessage('Passwords do not match')
        }
        else {
            dispatch(register(name, email, password, refferalId))
            navigate('/')
        }
    }


    return (
        <Row>
            <Col xs={12} sm={12} md={6} lg={6} className='m-auto '>
                <div className="text-center">
                    <div className="screen">
                        <div className="screen__content">

                            <Form onSubmit={submitHandler} className="login">
                                {message && <Message variant="danger">{message}</Message>}
                                {error && <Message variant="danger">{error}</Message>}
                                {loading && <Loader />}
                                <h3>Register</h3>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="login__input" placeholder="Email" required />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="login__input" placeholder="Name" required />
                                </div>
                                {/* <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="text" className="login__input" placeholder="Phone Number" />
                        </div> */}
                                <div className="login__field">
                                    <i className="login__icon fas fa-lock"></i>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="login__input" placeholder="Password" required />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-lock"></i>
                                    <input value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="login__input" placeholder="Confirm Password" required />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input value={refferalId} onChange={(e) => setRefferalId(e.target.value)} type="text" className="login__input" placeholder="Have a referral id ?!" />
                                </div>
                                <Button type='submit' className="button login__submit m-auto">
                                    <span className="button__text">Register</span>
                                    <i className="button__icon fas fa-chevron-right"></i>
                                </Button>
                                <div className='d-flex align-items-center pt-2 mr-0'>
                                    <p className='mb-0 me-2 font-weight-bold para'><strong>Already have an account?</strong></p>
                                    {/* <button type='button' className='btn btn-primary rounded sm' size="sm">Login here</button> */}
                                    <Button onClick={() => navigate('/signin')} variant="primary rounded" size="sm">
                                        Log In
                                    </Button>
                                </div>
                            </Form>

                        </div>
                        <div className="screen__background">
                            <span className="screen__background__shape screen__background__shape4"></span>
                            <span className="screen__background__shape screen__background__shape3"></span>
                            <span className="screen__background__shape screen__background__shape2"></span>
                            <span className="screen__background__shape screen__background__shape1"></span>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
};

export default SignUp;

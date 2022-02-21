import React, { useState, useEffect } from 'react';
import './Signin.css'
import { useNavigate,useSearchParams } from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/userActions'
import Message from '../components/Message';
import Loader from '../components/Loader';

const SignIn = () => {

 
  const dispatch = useDispatch();
  const [searchParams,setSearchParams] =useSearchParams();
  const redirect=searchParams.get('redirect') ||''
  const userLogin=useSelector(state => state.userLogin)
  const {loading,error,userInfo}=userLogin

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const navigate = useNavigate();

  useEffect(()=>{
    if(userInfo){
      navigate(`/${redirect}`)
    }
    console.log('+++++++++++++++')
  },[userInfo,redirect])

  const submitHandler=(e)=>{
    e.preventDefault()
    // console.log(email,password)
    dispatch(login(email,password))
  }

  return (
    <Row>
      <Col xs={12} sm={12} md={6} lg={6} className='m-auto'>
    <div className="container2">
      <div className="screen">
        <div className="screen__content">

          <Form onSubmit={submitHandler} className="login">
            <h3>log In</h3>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader/>}
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="login__input" placeholder=" Email" />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="login__input" placeholder="Password" />
            </div>
            <Button type='submit' className="button login__submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </Button>
            <div classNameName='d-flex align-items-center '>
              <p classNameName='mb-0 me-2'>Don't have an account?</p>
              <Button onClick={() => navigate('/signup')} type='button' className='rounded'>Create new</Button>
            </div>

            {/* <Button className="button login__submit">
              <span className="button__text">Log In with OTP</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </Button> */}
          </Form>

          {/* <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <a href="#" className="social-login__icon fab fa-instagram"></a>
              <a href="#" className="social-login__icon fab fa-facebook"></a>
              <a href="#" className="social-login__icon fab fa-twitter"></a>
            </div>
          </div>
        </div> */}
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

export default SignIn;

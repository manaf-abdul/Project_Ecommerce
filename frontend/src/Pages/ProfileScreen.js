import React, { useState, useEffect } from 'react';
// import './Signin.css'
import { Button, Form, Container, Row, Col, Table, Card, Tabs, Tab, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMyOrders } from '../actions/orderActions';
import { listAddresses } from '../actions/userActions'
import { deleteAddress } from '../actions/addressActions';

const ProfileScreen = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [key, setKey] = useState('home');

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const addressDelete = useSelector(state => state.addressDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = addressDelete

  const { addresses } = useSelector(state => state.addressList)

  useEffect(() => {
    // console.log('123456789');
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
        dispatch(listAddresses())
      } else {
        setName(user.name)
        setEmail(user.email)
        dispatch(listAddresses())
      }
    }
  }, [dispatch, navigate, userInfo, orders, successDelete])

  const submitHandler = (e) => {
    e.preventDefault()
    // console.log(email,password)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    }
    else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
      navigate('/profile')
    }
  }

  const deleteHandler = (id) => {
    dispatch(deleteAddress(id))
  }


  return (
    <>
    {/* <Container>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Orders">
        </Tab>
        <Tab eventKey="profile" title="Address">
        </Tab>
        <Tab eventKey="contact" title="Profile" >
        </Tab>
      </Tabs> */}

      {/* <Col md={9}>
          <h2 className='text-center pt-3'>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}    
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col> */}
    {/* </Container > */}

    <Container className='pt-2'>
<Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={3}>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="first">My Orders</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">My Addresses</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third">My Profile</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={9}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
          
        <Row>
            <Col>
              <h2 className='text-center pt-3'>My Orders</h2>
              {loadingOrders ? (
                <Loader />
              ) : errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
              ) : (
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt
                          ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt
                          ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button className='btn-sm' variant='light'>
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </Tab.Pane>

        <Tab.Pane eventKey="second">  
        <h3 className='pt-3 text-center' >My Addresses</h3>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          <Row>
            {/* <Col md={3}> */}
            {addresses.map((address) => (
              <Col key={address._id} >
                <Card className=' cards'>
                  <Card.Body >
                    <Row className='pb-3'>

                      <Link to={`/admin/editaddress/${address._id}`}>
                        <Card.Text>
                          <Card.Text as="div">{address.address}</Card.Text>
                          <Card.Text as="div">{address.city}</Card.Text>
                          <Card.Text as="div">{address.postalCode}</Card.Text>
                          <Card.Text as="div">{address.country}</Card.Text>
                        </Card.Text>
                      </Link>
                    </Row>
                    <Button className='sm' onClick={() => deleteHandler(address._id)}><i className='fas fa-times' style={{ color: 'red' }}></i>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            {/* </Col> */}
          </Row>
        </Tab.Pane>
        
        <Tab.Pane eventKey="third">
         
        <Row>
            <Col md={6} className='m-auto'>
              <h2 className='text-center pt-3'>User Profile</h2>
              {message && <Message variant='danger'>{message}</Message>}
              { }
              {success && <Message variant='success'>Profile Updated</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Confirm password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button type='submit' variant='primary'>
                    Update
                  </Button>
                </Form>
              )}
            </Col>
          </Row>



        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>




    </Container>
    </>
  )
};

export default ProfileScreen;

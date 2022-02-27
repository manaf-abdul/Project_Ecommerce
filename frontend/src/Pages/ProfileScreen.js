import React, { useState, useEffect } from 'react';
// import './Signin.css'
import { Button, Form, Container, Row, Col, Table, Card, Tabs, Tab, Nav, Image } from 'react-bootstrap'
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
  // console.log(user)

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
  }, [dispatch, navigate, userInfo, orders, successDelete, success, userUpdateProfile])

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
      {/* <Container className='pt-2'> */}
      <Tab.Container id="left-tabs-example" defaultActiveKey="third">
        <Row className="mr-0">
          <Col sm={3} style={{paddingRight:'0px'}}>
            <Nav variant="pills" className="flex-column" style={{ cursor: 'pointer' }}>
              <Nav.Item className='mr-0'>
                <Nav.Link eventKey="first" className='font-weight-bold'>My Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item className='mr-0'>
                <Nav.Link eventKey="second" className='font-weight-bold'>My Addresses</Nav.Link>
              </Nav.Item>
              <Nav.Item className='mr-0'>
                <Nav.Link eventKey="third" className='font-weight-bold'>My Profile</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={8}>
            <Container>
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
                        <Table striped bordered hover responsive className='table-sm tableColor'>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>DATE</th>
                              <th>TOTAL</th>
                              <th>PAID</th>
                              <th>DELIVERED</th>
                              <th>CANCELLED</th>
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
                                  {order.isCancelled ? (
                                    <>
                                    <i class="fa fa-check" aria-hidden="true" style={{ color: 'green' }}></i>
                                    {order.deliveredAt}
                                    </>
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
                  <h3 className='pt-3 text-center'>My Addresses</h3>
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
                      <Container>
                  <h2 className='text-center pt-3'>User Profile</h2>
                  <Row>
                    <Col md={6}>
                      <>
                        {/* <Card className=' cards'>
                          
                            <Row className='pb-3'>
                                <Card.Text>
                                  <Card.Text as="div">Name:{userInfo.name}</Card.Text>
                                  <Card.Text as="div">Email:{userInfo.email}</Card.Text>
                                  <Card.Text as="div">Wallet Balance:{userInfo.wallet}</Card.Text>
                                  <Card.Text as="div">Referral ID:{userInfo.referralId}</Card.Text>
                                </Card.Text>
                            </Row>
                        </Card> */}

                        <Card className='p-3 mt-4'>
                          <div style={{ textAlign: 'center' }}>
                            <i class="fa-solid fa-user fa-10x"></i>
                          </div>
                          <Card.Body>
                            <p>Name: <strong> {user.name} </strong></p>
                            <p>Email:<strong> {user.email} </strong></p>
                            <p>Wallet Balance:<strong> $ {user.wallet} </strong></p>
                            <p>Referral Id:<strong> {user.refferalId} </strong></p>
                          </Card.Body>
                        </Card>
                      </>
                    </Col>
                    <Col md={6} className='m-auto'>
                      <h4 className='text-center pt-3'>Edit Profile</h4>
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


                                   </Container>
                </Tab.Pane>
              
            </Tab.Content>
            </Container>
          </Col>
        </Row>
      </Tab.Container>




      {/* </Container> */}
    </>
  )
};

export default ProfileScreen;

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import { listCategories } from '../actions/categoryActions'
import { Button, Form, Container, Row, Col, Table, Tab, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addOffer, deleteOffer, listOffers } from '../actions/offerActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const CreateOffer = () => {
  const alert=useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [discount, setDiscount] = useState(0)
  const [category, setCategory] = useState('')

  // const categoryList = useSelector((state) => state.categoryList)
  // const { categorieslist } = categoryList

  const categoryList = useSelector(state => state.categoryList)
  const { loading, error, categorieslist } = categoryList

  const offerList = useSelector((state) => state.offerList)
  const { offerslist } = offerList

  const addNewOffer = useSelector((state) => state.addNewOffer)
  const { success } = addNewOffer

  const offerDelete = useSelector(state => state.offerDelete)
  const { loading:loadingDelete, error:errorDelete, success:successDelete} = categoryList


  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(addOffer({ name, discount, category }))
    navigate('/admin/offers')
  }

  const deleteHandler = async (offerId) => {
    dispatch(deleteOffer(offerId))
    navigate('/admin/offers')
  }

  useEffect(() => {
    // console.log('55555555555555555555555555555')
    dispatch(listCategories())
    dispatch(listOffers())
    // console.log(offerslist)
  }, [navigate, dispatch, success,successDelete,offerDelete])

  return (
    <>
      <Container>
        <Link to="/admin/categories" className="btn btn-light my-3">
          Go Back
        </Link>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" bg='primary'>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Offers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Add new offer</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row>
                    <Col md={9} className='m-auto'>
                      <h1>Offers</h1>
                      {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
                        <Table striped bordered hover responsive className='table-sm'>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Offers</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {offerslist.map((x) => (
                              <tr>
                                <td>{x.name}</td>
                                <td>{x.discount}</td>
                                <td>
                                <Button size='sm' className='sm' onClick={() => deleteHandler(x._id)}>
                                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                                  Delete
                                </Button>
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
                  <Row>
                    <Col md={9} className='m-auto'>
                      <h1>Add new Offer</h1>
                      {/* {success && <Message variant='success'>Offer Updated</Message>} */}
                      {/* {success && alert.show('Offer added')} */}
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                          <Form.Label>Name of the offer</Form.Label>
                          <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='discountPercentage'>
                          <Form.Label>Discount</Form.Label>
                          <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'>
                          <Form.Label>Category</Form.Label>
                          <Form.Control
                            as='select'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            {categorieslist && categorieslist.map((Categories) => (
                              <option key={Categories._id} value={Categories.name}>
                                {Categories.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                        <Row className='pt-2 ml-auto text-center'>
                          <Button type='submit' variant='primary' className='btn-block test'onClick={()=>alert.show('added')} >
                            Update
                          </Button>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        {/* <Row className='m-auto'>
        <Col md={4} className='m-auto'>
          </Col>
          <Col md={4} className='m-auto'>
            
          </Col>
        </Row> */}
      </Container>
    </>
  )
}

export default CreateOffer
import React, { useState } from 'react'
import { Button, Form, Container, Row, Col,Tab,Nav} from 'react-bootstrap'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const AddCategory = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const { data } = await axios.post('/api/categories', { name })
    navigate('/admin/categories')
  }


  return (<>
    <Container>
      <Link to="/admin/categories" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6} className='m-auto'>
          <h2 className='text-center pt-3'>Add new Category</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name of the category</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row className='pt-2 ml-auto text-center'>
              <Button type='submit' variant='primary' className='btn-block test' >
                Update
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  </>
  )
}

export default AddCategory
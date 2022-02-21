import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { Table,Button,Container,Row ,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {listCategories} from '../actions/categoryActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const CategoryList = () => {

  const navigate=useNavigate()
  const dispatch = useDispatch()

  const categoryList = useSelector(state=>state.categoryList)
    const {loading,error,categorieslist}=categoryList
    console.log(categorieslist)

  const createCategoryHandler=()=>{
    navigate('/admin/addcategory')
  }

  useEffect(() => {
    // console.log('6666666666')
    dispatch(listCategories())
  },[dispatch])


  return (
    <>
     <Container>
     <Row className='align-items-center'>
        <Col>
        <h1>Categories</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createCategoryHandler}>
            <i className='fas fa-plus'>Create new category</i>
          </Button>
        </Col>
        </Row>
        <Row>
          <Col md={10} className='m-auto'>
        {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>):(
            <Table striped bordered hover responsive className='table-sm tableColor'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Categories</th>                     
                </tr>
            </thead>
            <tbody>
                {categorieslist.map(category =>(
                    <tr>
                        <td>{category._id}</td>
                        <td>{category.name}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        )}
        </Col>
        </Row>
      </Container>
    </>
  )
}

export default CategoryList
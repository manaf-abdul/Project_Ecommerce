import React, {useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { Table,Button,Row,Col,Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts,deleteProduct,createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const productList = useSelector(state=>state.productList)
    const {loading,error,products}=productList

    const productDelete = useSelector(state=>state.productDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete}=productDelete

    const productCreate = useSelector(state=>state.productCreate)
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct}=productCreate

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            navigate('/signin')
        }
        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }
    },[dispatch,navigate,userInfo,successDelete,successCreate,createdProduct])

    const deleteHandler=(id) => {
        if(window.confirm('Are you Sure ?')){
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler=()=>{
        dispatch(createProduct())
    }

  return (
      <>
      <Container>
      <Row className='align-items-center'>
        <Col>
        <h1>Product</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'>Create Product</i>
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader/>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
          <Table striped bordered hover responsive className='table-sm'>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {products.map((product) =>(
                      <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.category}</td>
                          <td>{product.brand}</td>
                          <td><LinkContainer to={`/admin/product/${product._id}/edit`}>
                              <Button variant='light' className='btn-sm'>
                                  <i className='fas fa-edit'></i>
                              </Button>
                              </LinkContainer>
                              <Button variant ='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>Trash</Button>
                          </td>  
                      </tr>
                  ))}
              </tbody>
          </Table>
      )}
      </Container>
      </>
  )
};

export default ProductListScreen;

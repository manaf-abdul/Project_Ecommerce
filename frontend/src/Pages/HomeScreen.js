import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Products from '../components/Products';
import { Col, Row, Container } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {

  const params = useParams()
  const keyword = params.keyword
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
    console.log(keyword)

  }, [dispatch,keyword])


  return (
    <Container className="pt-3">
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
        <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Products product={product} />
            </Col>
          ))}
        </Row>
      }
    </Container>
  )
};

export default HomeScreen;

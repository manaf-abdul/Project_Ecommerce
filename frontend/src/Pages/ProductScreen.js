import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ReactImageMagnify from 'react-image-magnify'
// import Rating from '../components/Rating'
// import axios from 'axios'

const Product = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const [mainImage, setMainImage] = useState()

  useEffect(() => {
    dispatch(listProductDetails(`${params.id}`))

    // console.log(product)
  }, [])

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  return (
    <Container className='pt-3'>
      <Link className='btn btn-light my-3' to='/categories/electronics'>
        Go Back
      </Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

        <Row>
          <Col md={6}>
            <Card>
              {/* <Image src={mainImage} alt={product.name} fluid /> */}
              <ReactImageMagnify
                className="sample"
                {...{
                  smallImage: {
                    alt: 'Product Image',
                    isFluidWidth: true,
                    src: mainImage ? mainImage : product.image,
                  },
                  largeImage: {
                    src: mainImage ? mainImage : product.image,
                    width: 1200,
                    height: 1200,
                  },
                }}
              />
              <Row>
                {product.images && product.images.length > 0 && (
                  <Col className='m-auto'>
                    <Image
                      onClick={(e) => {
                        e.preventDefault()
                        setMainImage(product.image)
                      }}
                      src={product.image}
                      alt={product.name}
                      fluid
                      height='200'
                      width='150'
                      rounded
                      className='ml-auto'
                    />
                  </Col>
                )}

                {product.images &&
                  product.images.length > 0 &&
                  product.images.map((image) => {
                    return (
                      <Col className='m-auto'>
                        <Image
                          onClick={(e) => {
                            e.preventDefault()
                            setMainImage(image.url)
                          }}
                          src={image.url}
                          alt={image.name}
                          fluid
                          height='200'
                          width='150'
                          rounded
                          className='ml-auto'
                        />
                      </Col>
                    )
                  })}
              </Row>
            </Card>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              {/* <ListGroupItem>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroupItem> */}
              <ListGroupItem>
                <strike>Price:${product.discountPrice > 0 ? <strike>{product.price}</strike> : null}</strike>
                <strong>
                  {product.discountPrice > 0 ? <>  {product.discountPrice} % OFF</> : null}
                </strong>
              </ListGroupItem>
              <ListGroupItem>
                Price:$<strong>{product.discountPrice > 0
                  ? product.price - (product.price * (product.discountPrice / 100))
                  : product.price}
                </strong>
              </ListGroupItem>
              <ListGroupItem>
                Description:{product.description}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>
                      Price:
                    </Col>
                    <Col>
                      <strong>{product.discountPrice > 0
                        ? product.price - (product.price * (product.discountPrice / 100))
                        : product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>
                      Status:
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                          {
                            [...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1} >{x + 1}</option>
                            ))
                          }
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem>
                  <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
};

export default Product;

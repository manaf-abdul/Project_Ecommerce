import React from 'react';
import { Card } from 'react-bootstrap'   
import {Link} from 'react-router-dom'    
import Rating from './Rating'                                                                                             

const Products = ({product}) => {
  return (
    // <Container className="pt-2">
          <Link to={`/product/${product._id}`}>
          <Card className="rounded my-3 p-3 productCard">
            <Card.Text as='h4' className='productText'>
                {product.discountPrice > 0 ? <>{product.discountPrice}% OFF</>:null}
                </Card.Text>
            <Card.Img src={product.image} variant='top' />
            <Card.Body>
              <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
              <Card.Text as='div'>
                   <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </Card.Text>
              <Card.Text as='h4'>
                {product.discountPrice > 0 ? <strike>{product.price}</strike>:null}
                </Card.Text>
              <Card.Text as='h3'>
                {product.discountPrice > 0 
                ? product.price - (product.price * (product.discountPrice/100))
                :product.price}
                
              </Card.Text>
            </Card.Body>
          </Card>
          </Link>
         
    // </Container>
  )
};

export default Products;

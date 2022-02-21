import React from 'react';
// import {Col,Row,Container} from 'react-bootstrap'
import ControlledCarousel from '../components/Carousel'
import Categories from '../components/Categories'
// import LatestProducts from '../components/Products'

const CategoryScreen = () => {
  return (
      <>
      <ControlledCarousel/>
      <Categories></Categories>
      {/* <Container>
      <h2 className="pt-5">Latest</h2>
      <Row className="pt-2">
      
        <Col sm={12} md={6} lg={4} xl={3}>
      <LatestProducts caption="Latest Products"/>
      </Col>
     </Row>
     </Container> */}
      </>
  )
};

export default CategoryScreen;

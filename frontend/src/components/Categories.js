import React from 'react';
import {Row,Col,Container,Image} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const Categories = () => {

 const navigate=useNavigate()

  return(
    <Container className="pt-3">
    <h2 className="pt-2">Categories</h2>

    <Row>
        <Col className="text-center" onClick={()=>navigate('/categories/electronics')}>
        <Image  className="rounded" src="/images/MR-Future-Products-2020-2.png" rounded width="150px" height="150px" roundedCircle/>
        <h4>Electronics</h4>
        </Col>
        <Col className="text-center">
        <Image src="/images/20217-leggings-clothing-dancer-sportswear-trousers-4216x2529.jpg" rounded width="150px" height="150px" roundedCircle/>
        <h4>Clothings</h4>
        </Col>
        <Col className="text-center">
        <Image  className="rounded" src="/images/MR-Future-Products-2020-2.png" rounded width="150px" height="150px" roundedCircle/>
        <h4>Electronics</h4>
        </Col>
        <Col className="text-center">
        <Image src="/images/20217-leggings-clothing-dancer-sportswear-trousers-4216x2529.jpg" rounded width="150px" height="150px" roundedCircle/>
        <h4>Clothings</h4>
        </Col>

    </Row>
    </Container>

  )
};

export default Categories;

import React, { useState,useEffect } from 'react'
import { Form, Button, Container, Card, Row, Col, } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'
import { addTOAddresses, listAddresses } from '../actions/userActions'


const ShippingScreen = () => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const { addresses } = useSelector(state => state.addressList)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const [addressSelected, setAddressSelected] = useState()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        console.log({ address, city, postalCode, country })
        dispatch(addTOAddresses({ address, city, postalCode, country }))
        navigate('/payment')
    }

    const addressSelector = (data) => {
        setAddressSelected(data)
        if(addressSelected){
            dispatch(saveShippingAddress(addressSelected))
            navigate('/payment')
        }
    }

    useEffect(() => {
        dispatch(listAddresses())
    }, [])

    return (
        <Container>
            <CheckOutSteps step1 step2 />
            <h1 className='text-center'>Shipping</h1>
            <Row>
                <Col>
                <h3 className='text-center'>ENTER NEW ADDRESS</h3>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='address'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter address'
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter city'
                                value={city}
                                required
                                onChange={(e) => setCity(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='postalCode'>
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter postal code'
                                value={postalCode}
                                required
                                onChange={(e) => setPostalCode(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='country'>
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter country'
                                value={country}
                                required
                                onChange={(e) => setCountry(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        
                        <Button type='submit' variant='primary'  className='btn-block test' >
                            Continue
                        </Button>
                      
                    </Form>
                </Col>
                <Col>
                <h3 className='text-center pb-4'>SELECT AN ADDRESS</h3>
                    {addresses.map((address) => (
                        <Col key={address._id}>
                            <Card onClick={(e) => {
                                e.preventDefault()
                                addressSelector({
                                    address: address.address,
                                    city: address.city,
                                    postalCode: address.postalCode,
                                    country: address.country,
                                })
                            }} className='m-1 cards'>
                                <Card.Body>
                                    <Card.Text>
                                        <Card.Text as="div">{address.address}</Card.Text>
                                        <Card.Text as="div">{address.city}</Card.Text>
                                        <Card.Text as="div">{address.postalCode}</Card.Text>
                                        <Card.Text as="div">{address.country}</Card.Text>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Col>
            </Row>
        </Container>
    )
};

export default ShippingScreen;

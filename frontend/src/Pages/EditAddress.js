import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Card, Row, Col, } from 'react-bootstrap'
import { useNavigate,useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addTOAddresses,  } from '../actions/userActions'
import { getAddressDetails, updateAddress } from '../actions/addressActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const EditAddress = () => {
    const params=useParams()
  const addressId=params.id;

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addressDetails = useSelector((state) => state.addressDetails)
    const { loading, error, addres } = addressDetails

    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [postalCode, setPostalCode] = useState();
    const [country, setCountry] = useState();

    useEffect(()=>{
        console.log('555555')
        if(!addres.address||addres._id!==addressId){
            dispatch(getAddressDetails(addressId))
            // console.log(addressId)
        }else{
            setAddress(addres.address);
            setCity(addres.city);
            setPostalCode(addres.postalCode);
            setCountry(addres.country);
        }
    },[navigate,addressId,dispatch,addres])

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(updateAddress({id:addres._id,address,city,postalCode,country}))
        navigate('/profile')
    }

    return (
        <Container>
            <Row>
                <Col md={6} className='m-auto'>
                    <h3 className='text-center'>EDIT ADDRESS</h3>
                    {loading ? (<Loader/>):error?(<Message variant={'danger'}>{error}</Message>):
                    (

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

                        <Button type='submit' variant='primary' className='btn-block test' >
                            Continue
                        </Button>

                    </Form>

                    )
                  }
                   
                </Col>
            </Row>
        </Container>
    )
}

export default EditAddress
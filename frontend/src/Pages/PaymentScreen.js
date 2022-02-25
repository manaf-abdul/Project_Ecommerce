import React, { useState } from 'react'
import { Form, Button, Container ,Col,Row} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {saveShippingAddress} from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'
import {savePaymentMethod} from '../actions/cartActions'

const PaymentScreen = () => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch=useDispatch()
    const navigate=useNavigate()

    if(!shippingAddress) {
        navigate('/shipping')
    }
    const [paymentMethod,setPaymentMethod] = useState('RazorPay');
    console.log(paymentMethod)

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <Container>
            <CheckOutSteps step1 step2 step3/>
            <Row className='align-items-center'>
            <h1 className='m-auto'>PAYMENT METHOD</h1>
            </Row>
            <Row className='align-items-center justify-content-center'>
            <Col className='m-auto justify-content-center' style={{display:'flex'}}>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend' Select Method></Form.Label>
                
                    <Form.Check type='radio' label='Paypal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                    <Form.Check type='radio' label='RazorPay' id='RazorPay' name='paymentMethod' value='RazorPay' checked onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                    <Form.Check type='radio' label='Cash On Delivery' id='cod' name='paymentMethod' value='COD' onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>     
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
            </Col>
            </Row>
        </Container>
    )
};

export default PaymentScreen;

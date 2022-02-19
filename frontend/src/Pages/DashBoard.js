import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Button, Form, Container, Row, Col, Table, Tab, Nav, Card,Tabs} from 'react-bootstrap'

const DashBoard = () => {

    const [data,setData]=useState('')

    useEffect(() => {
        console.log('55555555')
        const getUnitsSold=async()=>{
            const {data}= await axios.get('/api/products/report/products')
            setData(data)
        }
        getUnitsSold()
    },[])





    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="p-0">
                <Row>
                    <Col sm={3}>
                        
                        <Nav variant="pills" className="p-3 align-items-center justify-content-center p-0" style={{backgroundColor: '#5C5696',cursor:'pointer'}}>
                        <Container>
                            <Nav.Item>
                                <Nav.Link eventKey="first" >Sales</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" >Add new offer</Nav.Link>
                            </Nav.Item>
                        </Container>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Row className="align-items-center justify-content-center">
                                <h1>Sales Overview</h1>
                                </Row>
                                <Row>
                                <Col lg={4} md={6} xs={12}>
                                <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                                    <Card.Body>
                                        <Card.Text className='text-center'>
                                            <Card.Text as="div">No. of units sold</Card.Text>
                                            <Card.Text as="div">{data}</Card.Text>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">

                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export default DashBoard
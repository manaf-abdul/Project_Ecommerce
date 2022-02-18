import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'


const Header = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const navigate = useNavigate()

    const logoutHandler = () => {
        // console.log('logout')
        dispatch(logout())
        navigate('/signin')
    }

    return (

        <Navbar collapseOnSelect expand="lg" style={{ background: "#6A679E" }} className="navbarcolor" variant="dark" >
            <Container>
                <Navbar.Brand onClick={() => navigate('/')}>MultiStore</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* <Nav className="mr-auto">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider#6A679E />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav> */}

                    <Nav className="ml-auto">
                        <Form className="d-flex pr-4">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success" classsName="" size="sm">Search</Button>
                        </Form>
                        <Nav.Link className="pr-4" eventKey={2} onClick={() => navigate('/cart')} >
                            <i class="fas fa-shopping-cart fa-2x"></i>
                        </Nav.Link>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) :
                            <Nav.Link className="pr-4" onClick={() => navigate('/signin')}><i className="fas fa-user fa-2x"></i></Nav.Link>
                        }
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <NavDropdown.Item onClick={() => navigate('/admin/userlist')}>Users</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/admin/productlist')}>Products</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/admin/orderlist')}>Orders</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/admin/categories')}>Categories</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/admin/offers')}>Offers</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Header;

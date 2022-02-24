import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'
import SearchBar from './SearchBar';


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

        <Navbar collapseOnSelect expand="lg" style={{ background: "#5C5696",height:'4rem',zIndex:1000,color:'red' }} className="navbarcolor" variant="dark" >
            {/* <Container> */}
                <Navbar.Brand style={{cursor:'pointer'}} onClick={() => navigate('/')}>MultiStore</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav" style={{ background: "#5C5696",color:'red' }}>
                   

                    <Nav className="ml-auto">

                    <SearchBar />
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
                                <NavDropdown.Item onClick={() => navigate('/admin/dashboard')}>Dashboard</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/admin/userlist')}>Users</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/admin/productlist')}>Products</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/admin/orderlist')}>Orders</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/admin/categories')}>Categories</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/admin/offers')}>Offers</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/admin/salesreport')}>SalesReport</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            {/* </Container> */}
        </Navbar>
    )
};

export default Header;

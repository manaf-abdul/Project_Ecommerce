import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'
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
        <header>
        <Navbar
          variant="dark"
          style={{ backgroundColor: '#4C489D',minHeight:'4rem'}}
          expand="lg"
          collapseOnSelect
          className='p-0'
        >
          <Container>
            <LinkContainer to="/" style={{ color: 'white',fontWeight:'bold',fontSize:'1.3rem'}}>
              <Navbar.Brand className='ml-1 brand-text'><span>M</span>ulti<span>S</span>tore</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              
              <Nav className="ml-auto">
                <SearchBar/>
  
                <LinkContainer
                  className="px-3"
                  style={{ color: 'white' }}
                  to="/cart"
                >
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown
                    className="px-3"
                    title={
                      <span style={{ color: 'white' }}>{userInfo.name}</span>
                    }
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer style={{ color: 'white' }} to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown
                    title={
                      <span style={{ color: 'white', paddingLeft: '0.5rem' }}>
                        Admin
                      </span>
                    }
                    id="adminmenu"
                  >
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/offers">
                      <NavDropdown.Item>Offers and Coupons</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/categories">
                      <NavDropdown.Item>Categories</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Order Report</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/salesreport">
                      <NavDropdown.Item>Sales Report</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>


    )
};

export default Header;

import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Header from '../components/Header';
import Electronics from '../Pages/Electronics';
import HomeScreen from '../Pages/HomeScreen';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import ProductScreen from '../Pages/ProductScreen';
import CartScreen from '../Pages/CartScreen';
import ProfileScreen from '../Pages/ProfileScreen';
import ShippingScreen from '../Pages/ShippingScreen';
import PaymentScreen from '../Pages/PaymentScreen';
import PlaceOrderScreen from '../Pages/PlaceOrderScreen';
import OrderScreen from '../Pages/OrderScreen';
import UserListScreen from '../Pages/UserListScreen';
import ProductListScreen from '../Pages/ProductListScreen';
import ProductEditScreen from '../Pages/ProductEditScreen';
import OrderListScreen from '../Pages/OrderListScreen'
import EditAddress from '../Pages/EditAddress'
import CategoryList from '../Pages/CategoryList';
import AddCategory from '../Pages/AddCategory';
import CreateOffer from '../Pages/CreateOffer';

const UserRoutes = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/order/:id' element={<OrderScreen/>} />
                <Route path='/' element={<HomeScreen />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/profile' element={<ProfileScreen />} />
                <Route path='/shipping' element={<ShippingScreen/>}/>
                <Route path='/categories/electronics' element={<Electronics/>}/> 
                <Route path='/product/:id' element={<ProductScreen/>}/>
                <Route path='/cart' element={<CartScreen/>}/>
                <Route path='/cart/:id' element={<CartScreen/>}/>
                <Route path='/admin/userlist' element={<UserListScreen/>}/>
                <Route path='/admin/productlist' element={<ProductListScreen/>}/>
                <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
                <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
                <Route path='/payment' element={<PaymentScreen/>}/>
                <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
                <Route path='/admin/editaddress/:id' element={<EditAddress/>}/>
                <Route path='/admin/categories' element={<CategoryList/>}/>
                <Route path='/admin/addcategory' element={<AddCategory/>}/>
                <Route path='/admin/offers' element={<CreateOffer/>}/>
                
               
            </Routes>
        </>
    )
};

export default UserRoutes;

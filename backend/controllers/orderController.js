import asyncHandler from "express-async-handler";
import Order from '../Models/orderModel.js'

const addOrderItems = asyncHandler(async(req,res) => {
    const {orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        walletDiscount} = req.body

    if(orderItems && orderItems.length===0){
        res.status(400)
        throw new Error('No order items')
    }else{
        const order=new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice:Number(itemsPrice),
            taxPrice,
            shippingPrice,
            totalPrice,
            walletDiscount,
        })
    console.log(order)
     const createdOrder=await order.save()
     console.log(createdOrder)
     res.status(201).json(createdOrder)   
    }
})

const getOrderById = asyncHandler(async(req,res) => {
   const order=await Order.findById(req.params.id).populate('user','name email')
   if(order){
       res.json(order)
   }else{
       res.status(404)
       throw new Error('Order not found')
   }
})

const updateOrderToPaid = asyncHandler(async(req,res) => {
    const order=await Order.findById(req.params.id)
    if(order){
        order.isPaid = true
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }
        const updatedOrder=await order.save()
        res.json(updatedOrder)
        console.log(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
 })

// const updateOrderToPaid = asyncHandler(async(req,res) => {
//     const order=await Order.findById(req.params.id)
//     if(order){
//         order.isPaid = true
//         order.paidAt=Date.now()
//         order.paymentResult={
//             id:req.body.id,
//             status:req.body.status,
//             update_time:req.body.update_time,
//             email_address:req.body.payer.email_address
//         }
//         const updatedOrder=await order.save()
//         res.json(updatedOrder)
//         console.log(updatedOrder)
//     }else{
//         res.status(404)
//         throw new Error('Order not found')
//     }
//  })


const updateOrderToDelivered = asyncHandler(async(req,res) => {
    console.log(req.body)
    const order=await Order.findById(req.params.id)
    if(order){
        order.isDelivered = true
        order.deliveredAt=Date.now()
       
        const updatedOrder=await order.save()
        res.json(updatedOrder)
        console.log(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
 })
 

const getMyOrders = asyncHandler(async(req,res) => {
    console.log(req.user._id)
    const orders=await Order.find({user:req.user._id})
   res.json(orders)
//    console.log(orders)
 })


const getOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({}).populate('user','id name')
    res.json(orders)
}) 

const getOrderReports=asyncHandler(async(req,res)=>{
    const orders=await Order.find({})
    const ordersLength=orders.length

    let totalRevenue = 0
    let unpaidPrice = 0
    let paidPrice = 0
    let paidOrders=0
    let unpaidOrders=0
    orders.forEach((order)=>{
       if(order.totalPrice){
            totalRevenue=totalRevenue+order.totalPrice;
       }
       if(!order.isPaid){
        unpaidPrice=unpaidPrice+order.totalPrice
        unpaidOrders=unpaidOrders+1;
       }
       if(order.isPaid){
        paidPrice=paidPrice+order.totalPrice
        paidOrders=paidOrders+1;
       }
    })
    res.json({totalPrice:totalRevenue,unpaid:unpaidPrice,paidprice:paidPrice,totalOrders:ordersLength,paidOrdersNumber:paidOrders,unpaidOrdersNumber:unpaidOrders})
}) 
 
export {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDelivered,getOrderReports}
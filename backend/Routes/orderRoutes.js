import express from 'express'
import {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDelivered,getOrderReports,report,cancelOrder} from '../controllers/orderController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

const router=express.Router()

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)
router.route('/report/orders').get(getOrderReports)
router.route('/salesreport').get(report)
router.route('/salesreport/:id').get(report)
router.route('/:id/cancel').put(protect, cancelOrder)


export default router
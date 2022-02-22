import express from 'express'
import {getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    getProductsReport,
    createProductReview, 
    getTopProducts} from '../controllers/productControllers.js'
import {protect,admin} from '../middleware/authMiddleware.js'

const router=express.Router()

router.get('/top', getTopProducts)
router.route('/:id/reviews').post(createProductReview)
router.route('/categories/electronics').get(getProducts)
router.route('/').post(protect,admin,createProduct)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)
router.route('/report/products').get(getProductsReport)

export default router
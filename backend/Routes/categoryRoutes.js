import express from 'express'
const router=express.Router()
import {addNewCategory,getCategories} from '../controllers/categoryController.js'

router.route('/').get(getCategories).post(addNewCategory)

export default router
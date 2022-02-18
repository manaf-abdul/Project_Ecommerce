import express from 'express'
import {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,updateUser} from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

const router=express.Router()

router.route('/register').post(registerUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/getusers').get(protect,admin,getUsers)
router.route('/:id').put(protect,admin,updateUser)

export default router
import express from 'express'
const router=express.Router()
import {addAddress,getAddresses,editAddress,getAddressDetails,deleteAddress} from '../controllers/AddressController.js'

router.route('/:id').get(getAddresses).post(addAddress).delete(deleteAddress)
router.route('/detail/:id').get(getAddressDetails).put(editAddress)

export default router
import express from 'express'
const router=express.Router()
import {addNewOffer,getOffers,deleteOffer,getOfferDetails} from '../controllers/offerController.js'

router.route('/').post(addNewOffer).get(getOffers)
router.route('/:id').delete(deleteOffer).get(getOfferDetails)

export default router
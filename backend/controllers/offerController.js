import asyncHandler from "express-async-handler";
import Offer from '../Models/offerModel.js'
import Product from '../Models/ProductModel.js'

const addNewOffer = asyncHandler(async(req,res) => {
    const {name,discount,category}=req.body
    const existingOffer=await Offer.findOne({name:name})
    if(existingOffer) {
        res.status(400)
        throw new Error('Offer already exists')
    }else{
    const offer= await Offer.create({
        name,
        discount,
        category,
    })
    const products=await Product.find({category:offer.category})
    products.forEach(async(product)=>{
        product.discountPrice=offer.discount
        await product.save()
    })
    if(offer){
        res.json(offer)
   }
   }
})

const getOffers = asyncHandler(async(req,res) => {
   const offers=await Offer.find({})
   res.json(offers)
})

const deleteOffer = asyncHandler(async(req,res) => {
    const offer=await Offer.findById(req.params.id)
    if(offer){
        const products=await Product.find({})
        products.forEach(async(product)=>{
        product.discountPrice=product.discountPrice-offer.discount
        await product.save()
    })
        await offer.remove()
        res.json({message:'Offer Removed'})
    }else{
        res.status(404)
        throw new Error('Offer not found')
    }
 })

const getOfferDetails = asyncHandler(async(req,res) => {
    const offerDetails=await Offer.findById(req.params.id)
    if(offerDetails){
        res.json(offerDetails)
    }else{
        res.status(404)
        throw new Error('Offer not found')
    }
 }) 



export {addNewOffer,getOffers,deleteOffer,getOfferDetails}
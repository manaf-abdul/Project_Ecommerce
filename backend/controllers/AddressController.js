import asyncHandler from "express-async-handler";
import Address from '../Models/addressModel.js'

// @desc    Add an address
// @route   POST /api/address/:id
// @access  Private
const addAddress=asyncHandler(async(req,res)=>{
    // console.log(req.body)
    const userId=req.params.id
    const {address,postalCode,country,city}=req.body

    const newAddress=new Address({
    address,
    postalCode,
    city,
    country,
    user:userId,
    })
    await newAddress.save()
    res.status(201).json(newAddress)        
})

// @desc    Get the addresses of a user
// @route   GET /api/address/:id
// @access  Private
const getAddresses = asyncHandler(async (req, res) => {
    const userId=req.params.id
    const address=await Address.find({user:userId})
    res.json(address)
})

const editAddress=asyncHandler(async (req, res) => {
    console.log(req.body)
    const addressId=req.params.id
    const Addresse=await Address.findById({_id:addressId})
    if(Addresse){
        Addresse.address=req.body.address||Address.address
        Addresse.city=req.body.city||Address.city
        Addresse.postalCode=req.body.postalCode||Address.postalCode
        Addresse.country=req.body.country||Address.country

        const updatedAddress=await Addresse.save()

        res.json({
            address:updatedAddress.email,
            city:updatedAddress.city,
            postalCode:updatedAddress.postalCode,
            country:updatedAddress.country
        })
    }else {
        res.status(404)
        throw new Error('Address not found')
      }
})

const getAddressDetails = asyncHandler(async (req, res) => {
    // console.log("+++++++" + req.body)
    const addressId=req.params.id
    const address=await Address.findById({_id: addressId})
    res.json(address)
    // console.log(address)
})

const deleteAddress=asyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id)
    if(address){
        await address.remove()
        res.json({message:'Address Removed'})
    }else{
        res.status(404)
        throw new Error('Address not found')
    }
})


export{addAddress,getAddresses,editAddress,getAddressDetails,deleteAddress}


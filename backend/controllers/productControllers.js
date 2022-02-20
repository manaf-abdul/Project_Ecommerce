import asyncHandler from "express-async-handler";
import Product from '../Models/ProductModel.js'
import Category from '../Models/categoryModel.js'
import cloudinary from 'cloudinary'

const getProducts = asyncHandler(async (req, res) => {
    const product = await Product.find({})
    // console.log(product)
    res.json(product)
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        images:[], 
        brand: 'Sample brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description',     
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body

    let images=[]
    
    if(typeof req.body.images==="string"){
        images.push(req.body.images)
    }else{
        images=req.body.images
    }

    let imagesLinks=[]

    for (let i=0;i<images.length;i++){
        const result=await cloudinary.v2.uploader.upload(images[i],{
            folder:'products',
            // width: 150,
            // height: 150,
            crop: 'scale',
        })
        imagesLinks.push({ 
            public_id: result.public_id,
            url: result.secure_url,
        })
    }
    req.body.images = imagesLinks

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name=name
        product.price=price
        product.description=description
        product.image=image
        product.images = req.body.images
        product.brand=brand
        product.category=category
        product.countInStock=countInStock
        const updatedProduct = await product.save()
        console.log(updatedProduct)
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const getProductsReport = asyncHandler(async (req, res) => {
    const product = await Product.find({})
    const productNum=product.length
    const categories = await Category.find({})
    const categoriesNum=categories.length
    const catProduct= await Product.find({}).populate('category','id name')
    console.log(catProduct)
    res.json({productCount:productNum,categoriesCount:categoriesNum})
})


export { getProducts, getProductById, deleteProduct,createProduct,updateProduct,getProductsReport }
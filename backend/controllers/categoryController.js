import asyncHandler from "express-async-handler";
import Category from '../Models/categoryModel.js'

const addNewCategory = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const {name}=req.body

    const existingCategory=await Category.findOne({name:name})

    if(existingCategory){
        res.status(400)
      throw new Error('Category already exists')
    }

    const category= await Category.create({name:name})

    if(category){
        res.status(201).json(category)
    }
})

const getCategories= asyncHandler(async (req, res) => {
   const categories=await Category.find({})
   res.json(categories)
})

export {addNewCategory,getCategories}

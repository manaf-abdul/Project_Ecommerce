import asyncHandler from "express-async-handler";
import User from '../Models/userModel.js'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async(req,res) => {
  console.log(req.body)
    const {email,password}=req.body
    const user= await User.findOne({email: email})

    if(user && (await user.matchPassword(password))){
      if(user.isBlock){
        res.status(401)
        throw new Error('User blocked by admin')
      }else{
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
        console.log('user signin success')
      }
    }
    else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })


const updateUserProfile = asyncHandler(async (req, res) => {
  console.log(req)
    const user = await User.findById(req.user._id)
  
    if (user) {
      user.name=req.body.name || user.name
      user.email=req.body.email || user.email
      if(req.body.password) {
        user.password=req.body.password
      }
      const updateUser=await user.save()
      res.json({
        _id:updateUser._id,
        name:updateUser.name,
        email:updateUser.email,
        isAdmin:updateUser.isAdmin,
        token:generateToken(updateUser._id)
    })
     
    } else {
      res.status(404)
      throw new Error('User not found')
    }
}) 

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
    const { name, email, password } = req.body
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = await User.create({
      name,
      email,
      password,
    })
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })

  const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  console.log(req.body)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    user.isBlocked = req.body.isBlocked

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
    console.log(user)
    console.log(updatedUser)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
  
  // const isBlock=asyncHandler(async (req, res) => {
  //  const user=await User.findById(req.params.id,{isBlock:true})
    
  //   res.status(200).json({
  //     success:true,
  //   })
  // })

  // const isUnBlock=asyncHandler(async (req, res) => {
  //   const user=await User.findByIdAndUpdate(req.params.id,{isBlock:false})
  //    res.json(user)
  //    res.status(200).json({
  //     success:true,
  //   })
  //  })



export {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,updateUser} 

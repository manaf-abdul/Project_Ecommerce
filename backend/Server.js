import path from 'path'
import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import morgan from 'morgan'
import productRoutes from './Routes/productRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
import uploadRoutes from './Routes/uploadRoutes.js'
import addressRoutes from './Routes/addressRoutes.js'
import categoryRoutes from './Routes/categoryRoutes.js'
import offerRoutes from './Routes/offerRoutes.js'
import Razorpay from 'razorpay'
import shortid from 'shortid'
import Order from './Models/orderModel.js'
import bodyparser from 'body-parser'
import fileupload from 'express-fileupload'
import cloudinary from 'cloudinary'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
const app = express()
connectDB()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json({ limit: "50mb" }))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use('/api/products', fileupload())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/offers', offerRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const getOrder = async (id) => {
  const data = Order.findById(id).populate('user', 'name email')
  // console.log(data)
  return data
}

app.post('/razorpay/:id', async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  const payment_capture = 1
  const amount = 500
  const currency = 'INR'
  const options = {
    amount: order.totalPrice * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  }
  console.log(options.amount)

  try {
    const response = await razorpay.orders.create(options)
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    })
  } catch (err) {
    console.log(err)
  }
})

app.post('/razorpay/success/:id', async (req, res) => {
  const order = await getOrder(req.params.id)
  order.isPaid = true
  order.paidAt = Date.now()
  await order.save()
  res.status(200).json('success')
})

app.use(bodyparser.urlencoded({ extended: true }))
app.use(notFound)
app.use(errorHandler)


app.listen(process.env.PORT, console.log(`Server started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`))
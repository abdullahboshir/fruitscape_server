import express from 'express'
const app = express()
import cors from 'cors'
// import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import cookieParser from 'cookie-parser'
import router from './app/routes'


// parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


const allowedOrigins = [
  'http://localhost:3000'
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

 
    console.error(`❌ CORS Blocked: Origin ${origin} not allowed`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));



app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.send('Hello, Welcome to FruitScape world!')
})

app.use(globalErrorHandler)
app.use(notFound)

export default app

import express from 'express'
import authrouter from './routes/authRoutes.js';
import cookieparser from 'cookie-parser'
import appointmentRoute from './routes/appointmentRoutes.js';
import passRoute from './routes/passRoutes.js';
import checklogRouter from './routes/checklogRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import cors from 'cors'
import errorHandler from './middleware/errorMiddleware.js';
import userRouter from './routes/userRoutes.js'
import dns from 'dns'

dns.setServers(["1.1.1.1","8.8.8.8"])

const app=express();

app.use(cors({
  origin: "https://visitor-pass-ui.vercel.app",
  credentials: true,
  methods: ["GET","POST","PUT","DELETE"],
}));


app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Visitor Pass API running'
  });
});


app.use('/api/auth',authrouter)
app.use('/api/appointments',appointmentRoute)
app.use('/api/passes',passRoute)
app.use('/api/checklogs',checklogRouter)
app.use('/api/dashboard',dashboardRoutes)
app.use('/api/users',userRouter)
app.use(errorHandler)

export default app

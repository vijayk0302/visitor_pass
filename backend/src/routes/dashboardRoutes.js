import express from 'express'
import { appointmentstats, countpending, countvisitors, totalemployess } from '../controller/dashboardController.js'
import { authenticate } from '../middleware/authenticatMiddleware.js'
import { authorize } from '../middleware/authorizeMiddleware.js'




const dashboardRoutes=express.Router()

dashboardRoutes.get('/employees',authenticate,authorize('admin') ,totalemployess)
dashboardRoutes.get('/pending',authenticate,authorize('admin') ,countpending)
dashboardRoutes.get('/visitors',authenticate,authorize('admin') ,countvisitors)
dashboardRoutes.get('/stats',authenticate,authorize('admin'),appointmentstats)


export default dashboardRoutes
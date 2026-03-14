import express from 'express'
import { authenticate } from '../middleware/authenticatMiddleware.js'
import { authorize } from '../middleware/authorizeMiddleware.js'
import { getallpass , getownpass, getpassbyid } from '../controller/passController.js'


const passRoute=express.Router()
passRoute.get('/all',authenticate,authorize('admin','employee',"security"),getallpass)

passRoute.get('/visitor/my-passes/:id',authenticate,authorize('visitor'),getownpass)

passRoute.get('/view/:id',authenticate,authorize('admin','employee',"security",'visitor'),getpassbyid)



export default passRoute
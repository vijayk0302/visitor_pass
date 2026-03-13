import express from 'express'
import { authenticate } from '../middleware/authenticatMiddleware.js'
import { authorize } from '../middleware/authorizeMiddleware.js'
import { scanvisitor, getallchecklog } from '../controller/checklogController.js'

const checklogRouter=express.Router()

checklogRouter.get('/',authenticate,authorize('admin','security'),getallchecklog)
checklogRouter.post('/scanvisitor/:id',authenticate,authorize('admin','security'),scanvisitor)


export default checklogRouter
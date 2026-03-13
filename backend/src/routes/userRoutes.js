import express from 'express'
import { deleteuser, getalluser, getMe, getuserbyid, getVisitor, updateuser, updatesisitorstatus } from '../controller/userController.js';
import {authenticate} from '../middleware/authenticatMiddleware.js'
import { authorize } from '../middleware//authorizeMiddleware.js'

 const userRouter= express.Router();

userRouter.get('/',authenticate,authorize('admin'),getalluser)
userRouter.get('/me',authenticate,authorize('admin','employee','security','visitor'),getMe)
userRouter.get('/visitor',getVisitor)
userRouter.put('/visitor/status/:id',updatesisitorstatus)
userRouter.get('/:id',authenticate,authorize('admin'),getuserbyid)
userRouter.put('/:id',authenticate,authorize('admin'),updateuser)
userRouter.delete('/:id',authenticate,authorize('admin'),deleteuser)

export default userRouter
import express from 'express'
import {  changepassword, createuserbyAdmin, loginUser, logout, registerUser,registerAdmin, verify } from '../controller/authController.js';
import {authenticate} from '../middleware/authenticatMiddleware.js'
import { authorize } from '../middleware//authorizeMiddleware.js'
import {preventadmin} from '../middleware/preventadminMiddleware.js'

const authrouter= express.Router();

authrouter.post('/register',registerUser)
authrouter.post('/register/admin',registerAdmin)
authrouter.post('/verify',verify)

authrouter.post('/login',loginUser)
authrouter.patch('/logout',authenticate,logout)

authrouter.post('/create-user',authenticate,authorize('admin'),preventadmin,createuserbyAdmin)
authrouter.post('/change-password/',authenticate,authorize('admin','employee','security','visitor'),changepassword)

export default authrouter;
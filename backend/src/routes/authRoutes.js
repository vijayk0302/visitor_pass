import express from 'express'
import {  changepassword, createuserbyAdmin, loginUser, logout, registerUser,registerAdmin, verify, setpassword } from '../controller/authController.js';
import {authenticate} from '../middleware/authenticatMiddleware.js'
import { authorize } from '../middleware//authorizeMiddleware.js'
import {preventadmin} from '../middleware/preventadminMiddleware.js'
import { validator } from '../Validator/authvalidator.js';
import { validate } from '../middleware/validate.js';
import { passwordvalidator } from '../Validator/passwordvalidate.js';
import { setpasswordvalidator } from '../Validator/setpassword.js';

const authrouter= express.Router();

authrouter.post('/register',validator,validate,registerUser)
authrouter.post('/register/admin',validator,validate,registerAdmin)
authrouter.post('/verify',verify)
authrouter.post('/set-password',setpasswordvalidator,validate,setpassword)

authrouter.post('/login',loginUser)
authrouter.patch('/logout',authenticate,logout)

authrouter.post('/create-user',authenticate,authorize('admin'),preventadmin,createuserbyAdmin)
authrouter.post('/change-password/',authenticate,authorize('admin','employee','security','visitor'),passwordvalidator,validate,changepassword)

export default authrouter;
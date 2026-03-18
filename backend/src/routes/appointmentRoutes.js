import express from 'express'
import { authenticate } from '../middleware/authenticatMiddleware.js';
import { authorize } from '../middleware/authorizeMiddleware.js';
import multer from 'multer'
import { approveappointment, createappointment, getappointment, getappointmentbyid, rejectappointment } from '../controller/appointmentController.js';

const upload =multer({
    storage:multer.memoryStorage()
})

const appointmentRoute=express.Router()

appointmentRoute.post('/create',authenticate,authorize('visitor'),upload.single("photo"),createappointment)
appointmentRoute.patch('/update/:id',authenticate,authorize('admin','employee'),approveappointment)
appointmentRoute.get('/',authenticate,authorize('admin','employee'),getappointment)
appointmentRoute.get('/:id',authenticate,authorize('admin','employee'),getappointmentbyid)
appointmentRoute.put('/reject-appointment/:id',authenticate,authorize('admin','employee'),rejectappointment)

export default appointmentRoute;
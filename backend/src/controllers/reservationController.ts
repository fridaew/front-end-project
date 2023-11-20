import express from 'express'
import * as reservationModel from '../models/reservationModel'
import * as userModel from '../models/userModel'
import { requiresAuth } from '../middleware/auth';

const router = express.Router();

router.get('/:id', reservationModel.getReservationById )
router.get('/', reservationModel.getReservation )

router.post('/', reservationModel.createReservation )
// router.post('/', userModel.getAuthenticatedUser, reservationModel.createReservation )


export default router



import express from 'express'
import * as userModel from '../models/userModel'
import { requiresAuth } from '../middleware/auth';


const router = express.Router();

router.post('/signup', userModel.signUp )

router.post('/login', userModel.login )

router.get('/', userModel.getAuthenticatedUser )
// router.get('/', userModel.getAuthenticatedUser )

router.post('/logout', userModel.logout )


export default router
import express from 'express';
import {signupValidation,loginValidation} from '../middlewares/authValidation.js';
import {login, signup} from '../controllers/auth.js';

const router = express.Router();

router.post('/login',loginValidation, login);

router.post('/signup',signupValidation,signup); 

export default router;
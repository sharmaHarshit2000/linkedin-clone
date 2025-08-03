import express from 'express';
import { getUserProfile } from '../controllers/userController.js';

const router = express.Router();

//Get user profile and their posts
router.get('/:id', getUserProfile);

export default router;

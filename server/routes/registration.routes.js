import { Router } from 'express';
import { registerForSeminar, listUserRegistrations } from '../controllers/registration.controller.js';

const router = Router();

// Register current user (expects userId in body for now)
router.post('/', registerForSeminar);

// Get registrations for a user
router.get('/user/:userId', listUserRegistrations);

export default router;



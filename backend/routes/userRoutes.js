import express from 'express'
const router = express.Router();
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, createOrder, getOrders } from '../controller/userController.js'
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.post('/order', protect, createOrder)
router.post('/getOrders', getOrders)

export default router
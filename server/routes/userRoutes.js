/** @format */

const cors = require('cors');
const express = require('express');

const cartRoutes = require('./cartRoutes');
// const adminController = require('../controllers/adminController');
const authenticationController = require('../controllers/authenticationController');

const router = express.Router();

router.use(cors());
router.post('/signUp', authenticationController.signUp);
router.post('/login', authenticationController.login);
router.post('/forgotPassword', authenticationController.forgotPassword);
router.patch('/resetPassword/:token', authenticationController.resetPassword);

// Now for protected routes

router.use(authenticationController.protect);

router.get('/', authenticationController.getMe);

router.patch('/deactivateAccount');
router.get('/logout', authenticationController.logout);

// Might add this to cart route
router.route('/cart', cartRoutes);

// get current user orders(active)
router.get('/order');

// get current user orders(all)
router.get('/order/all');

// delete pending order
router.delete('/order/:id');

module.exports = router;

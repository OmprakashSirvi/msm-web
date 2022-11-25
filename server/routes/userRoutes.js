/** @format */

const cors = require('cors');
const express = require('express');

const cartRoutes = require('./cartRoutes');
const orderRoutes = require('./orderRoutes');
// const adminController = require('../controllers/adminController');

const cartController = require('../controllers/cartController');
const authenticationController = require('../controllers/authenticationController');

const router = express.Router();

router.use(cors());
router.post('/signUp', authenticationController.signUp);
router.post('/login', authenticationController.login);
router.post('/forgotPassword', authenticationController.forgotPassword);
router.patch('/resetPassword/:token', authenticationController.resetPassword);

router.get('/isLoggedIn', authenticationController.isLoggedIn, authenticationController.checkUser);

// Now for protected routes

router.use(authenticationController.protect);

router.get('/', authenticationController.getMe);

router.patch('/deactivateAccount');
router.get('/logout', authenticationController.logout);

router.use('/cart', cartRoutes);

router.use('/order', orderRoutes);

module.exports = router;

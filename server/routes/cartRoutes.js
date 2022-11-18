/** @format */

const express = require('express');

const cartController = require('../controllers/cartController');

const router = express.Router();

router
   .route('/')
   .get(cartController.getUserCart)
   .post(cartController.addToCart);

router.delete('/:id', cartController.deleteCartItem);

module.exports = router;

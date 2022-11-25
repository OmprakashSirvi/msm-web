/** @format */

const express = require('express');

const cartController = require('../controllers/cartController');

const router = express.Router();

router
  .route('/')
  .get(cartController.getUserCart)
  .post(cartController.addToCart)
  .patch(cartController.removeCartQuantity);

router.route('/:id').delete(cartController.deleteCartItem).patch(cartController.addQuantity);

module.exports = router;

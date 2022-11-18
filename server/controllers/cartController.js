/** @format */

const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');

const Cart = require('../models/cartModel');

exports.addToCart = catchAsync(async (req, res, next) => {
   const cartObj = {
      refToItem: req.body.item_id,
      quantity: req.body.quantity,
      refToUser: req.user._id,
      price: req.body.price,
   };

   const newCart = await Cart.create(cartObj);

   res.status(200).json({
      status: 'success',
      message: 'Cart added',
      data: newCart,
   });
});

exports.getUserCart = catchAsync(async (req, res, next) => {
   const query = { refToUser: req.user._id };

   const userCart = await Cart.find(query);

   if (!userCart) {
      return res.status(200).json({
         status: 'success',
         message: 'Cart is empty for current user',
      });
   }

   res.status(200).json({
      status: 'success',
      message: 'Found your cart items',
      data: userCart,
   });
});

exports.deleteCartItem = catchAsync(async (req, res, next) => {
   const doc = await Cart.findById(req.params.id);

   // if (!doc) return next(new AppError('Cart ID invalid!', 404));

   // if (doc.refToUser == req.user._id) {
   //   console.log('From cartController.deleteFromCart : ');
   //   console.log('True');
   // }

   res.status(204);
});

/** @format */

const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');

const Cart = require('../models/cartModel');
const CatchAsync = require('../utils/CatchAsync');

exports.addToCart = catchAsync(async (req, res, next) => {
  const query = { refToUser: req.user._id };

  const userCart = await Cart.find(query);

  for (let i = 0; i < userCart.length; i++) {
    if (userCart[i].refToItem._id.toString() === req.body.item_id) {
      userCart[i].quantity += 1;

      await Cart.findByIdAndUpdate(userCart[i]._id, userCart[i]);

      res.status(203).json({ status: 'success', message: 'Cart updated', data: userCart });
      return;
    }
  }

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
  await Cart.findByIdAndDelete(req.params.id);

  // if (!doc) return next(new AppError('Cart ID invalid!', 404));

  // if (doc.refToUser == req.user._id) {
  //   console.log('From cartController.deleteFromCart : ');
  //   console.log('True');
  // }

  res.status(204).json({ status: 'success' });
});

exports.removeCartQuantity = catchAsync(async (req, res, next) => {
  const query = { refToUser: req.user._id, refToItem: req.body.item_id };

  const userCart = await Cart.find(query);

  if (userCart.length === 0) return next(new AppError('No cartItem found by that Id!', 404));

  if (userCart[0].quantity > 1) userCart[0].quantity -= 1;
  else {
    await Cart.findByIdAndDelete(userCart[0]._id.toString());

    res.status(204).json({ stauts: 'success' });
    return;
  }

  await Cart.findByIdAndUpdate(userCart[0]._id.toString(), userCart[0]);

  res.status(201).json({
    status: 'success',
    message: 'Updated quantity of cart item',
    data: userCart,
  });
});

exports.addQuantity = catchAsync(async (req, res, next) => {
  // const cartItem = await Cart.findById(req.params.id);
  const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { quantity: req.body.quantity });

  if (!updatedCart) return next(new AppError('No cart exists with that id!', 404));

  res.status(201).json({ status: 'success', message: 'Item updated' });
});

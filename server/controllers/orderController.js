const Order = require('../models/orderModel');
const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync');

exports.getPendingOrders = CatchAsync(async (req, res, next) => {
  const query = { refToUser: req.user._id, stauts: 'pending' };
  const orders = await Order.find(query);

  if (!orders) return next(new AppError('Orders not found!', 404));

  res.status(200).json({ status: 'success', message: 'got your orders', data: orders });
});

exports.getAllOrders = CatchAsync(async (req, res, next) => {
  const query = { refToUser: req.user._id };
  const orders = await Order.find(query);

  if (!orders) return next(new AppError('Orders not found!', 404));

  res.status(200).json({ status: 'success', message: 'got your orders', data: orders });
});

exports.getOrder = CatchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new AppError('Order not found!', 404));

  res.status(200).json({ status: 'success', message: 'got your order', data: order });
});

exports.updateOrder = CatchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body);

  if (!order) return next(new AppError('Order not found!', 404));

  res.status(202).json({ status: 'success', message: 'Updated Your order' });
});

exports.deleteOrder = CatchAsync(async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.id);

  res.status(204).json({ status: 'success', message: 'Updated Your order' });
});

exports.placeOrder = CatchAsync(async (req, res, next) => {
  const body = {
    refToItem: req.body.refToItem,
    refToUser: req.user._id,
    quantity: req.body.quantity,
  };
  const order = await Order.create(body);

  if (!order) return next(new AppError('Something went wrong', 400));

  res.status(200).json({ status: 'success', message: 'Order is placed', data: order });
});

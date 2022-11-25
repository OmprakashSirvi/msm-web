/** @format */

const fs = require('fs');

const Item = require('../models/itemsModel');
const Cart = require('../models/cartModel');
const path = require('path');

const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync');

/* GET request handler */
exports.getItems = CatchAsync(async (req, res, next) => {
  const items = await Item.find();

  if (!items) return next(new AppError('No items were found', 404));

  res.status(200).json({
    status: 'success',
    message: 'Found your items',
    data: items,
  });
});

exports.getItem = CatchAsync(async (req, res, next) => {
  const data = await Item.findById(req.params.id);

  if (!data) return next(new AppError('Nothing found with that id..!', 404));

  res.status(200).json({
    status: 'success',
    message: 'Found your requested Item',
    data,
  });
});

/* POST Request handler */
exports.addItem = CatchAsync(async (req, res, next) => {
  /* The request.body must have all these values */

  const highlights = req.body.highlights.split(', ');
  const size = req.body.size.split(', ');

  const item = {
    name: req.body.name,
    category: req.body.category,
    type: req.body.type,
    color: req.body.color,
    description: req.body.description,
    price: req.body.price,
    size: size,
    highlights: highlights,
    stock: req.body.stock,
    images: req.files.images,
  };

  const newItem = await Item.create(item);

  if (!newItem) return next(new AppError('Something went Wrong', 400));

  res.status(201).json({
    status: 'success',
    message: 'Items Add Success',
    data: newItem,
  });
  // .redirect('/shop');
});

exports.addStock = CatchAsync(async (req, res, next) => {
  const newStock = req.body.stock;

  const item = await Item.findByIdAndUpdate(req.params.id, {
    stock: { $inc: newStock },
  });

  if (!item) return next(new AppError('No item found wiht that id', 404));

  console.log(item);

  res.status(200).json({
    stauts: 'sucees',
    message: 'Stock Added',
    data: item,
  });
});

/* PUT Request handler */
exports.updateItem = (req, res) => {
  res.json({ message: 'update Item' });
};

/* DELETE Request handler */
exports.deleteItem = CatchAsync(async (req, res, next) => {
  await Item.findByIdAndDelete(req.params.id);

  await Cart.deleteMany({ refToItem: req.params.id });

  res.status(204);
});

/** @format */

const mongoose = require('mongoose');
const Item = require('./itemsModel');

const orderSchema = new mongoose.Schema(
  {
    refToItem: {
      type: mongoose.Schema.ObjectId,
      ref: 'Item',
      required: ['true', 'No Item id for this cart object'],
    },
    refToUser: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: ['true', 'No User id for this cart object'],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'approved', 'shipping', 'shipped'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.virtual('order_time').get(function () {
  const date = new Date(Date.now());
  return date.toISOString();
});

orderSchema.virtual('price').get(async function () {
  const item = await Item.findById(this.refToItem.toString());
  return item.price * this.quantity;
});

orderSchema.pre(/^find/, function () {
  this.populate({
    path: 'refToItem',
    select: 'name size price color',
  });
});

module.exports = mongoose.model('Order', orderSchema);

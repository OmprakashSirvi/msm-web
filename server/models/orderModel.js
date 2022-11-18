/** @format */

const mongoose = require('mongoose');

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
      price: {
         type: Number,
         required: ['true', 'Price of order is required'],
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

module.exports = mongoose.model('Order', orderSchema);

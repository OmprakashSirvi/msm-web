/** @format */

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
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
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'refToItem',
    select: 'name size price images color',
  });

  next();
});

module.exports = mongoose.model('Cart', cartSchema);

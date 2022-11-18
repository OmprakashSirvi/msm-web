/**
 * /* Schema for the Item document
 *
 * @format
 */

const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'Provide name of Item'],
         unique: [true, 'Name must be unique'],
      },
      category: {
         type: String,
         required: [true, 'Provide category of Item'],
         enum: ['saree', 'lehnga', 'kurti'],
      },
      // Change to color Variants
      color: {
         type: String,
         required: true,
      },

      // Replace this with quality
      type: {
         type: String,
         required: true,
      },

      description: {
         type: String,
         required: [true, 'Provide description of Item'],
      },

      price: {
         type: Number,
         required: true,
      },
      size: {
         type: Array,
         required: true,
      },

      // Remove this
      highlights: {
         type: Array,
         required: true,
      },

      // Removing this
      //   detail: {
      //      type: String,
      //      required: true,
      //   },
      image: {
         type: Array,
         required: true,
      },

      // These are newly added paremeters
      stock: {
         type: Number,
         required: true,
      },
      ratingsAverage: {
         type: Number,
         default: 4.5,
         min: [1, 'Rating is always number 1'],
         max: [5, 'Rating not more than 5 allowed'],
         set: (val) => Math.round(val * 10) / 10,
      },
      ratingsQuantity: {
         type: Number,
         default: 0,
      },
   },
   {
      timestamps: true,
   }
);

// virtual property for to check item is in stock..
itemSchema.virtual('in_stock').get(function () {
   if (this.stock > 0) return true;
   return false;
});

module.exports = mongoose.model('Item', itemSchema);

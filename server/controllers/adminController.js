/** @format */

const User = require('../models/userModel');
const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
   const users = await User.find();

   if (!users) next(new AppError(404, 'No documents found'));

   res.status(200).json({
      status: 'success',
      message: 'Got your Users',
      users,
   });
});

/** @format */

const { findByIdAndUpdate } = require('../models/itemsModel');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync');

exports.getMe = (req, res, next) => {
  const userDetails = { name: req.user.name, email: req.user.email };

  res.status(200).json({
    status: 'success',
    message: 'Got your details',
    data: userDetails,
  });
};

exports.deactivateAccount = CatchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: 'success' });
});

exports.getUserInfo = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.paramas.id);

  if (!user) return next(new AppError('No user found by that ID!!'), 404);

  res.status(200).json({ status: 'success', message: 'User detail found', data: user });
});

exports.changeUserRole = CatchAsync(async (req, res, next) => {
  const user = await findByIdAndUpdate(req.params.id, { role: req.body.role });

  if (!user) return next(new AppError('No user found !', 404));

  res.status(202).json({ status: 'success' });
});

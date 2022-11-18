/** @format */

const User = require('../models/userModel');

exports.getMe = (req, res, next) => {
   const userDetails = { name: req.user.name, email: req.user.email };

   res.status(200).json({
      status: 'success',
      message: 'Got your details',
      data: userDetails,
   });
};

exports.deactivateAccount = async (req, res, next) => {
   await User.findByIdAndUpdate(req.user._id, { active: false });

   res.status(204).json({ status: 'success' });
};

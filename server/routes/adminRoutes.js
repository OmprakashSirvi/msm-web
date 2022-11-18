/** @format */

const express = require('express');

// Custom routes
const itemController = require('../controllers/itemsController');
const adminController = require('../controllers/adminController');
const authenticationController = require('../controllers/authenticationController');

// For uploading photos
const uploadPhoto = require('../middlewares/upload');

// define router
const router = express.Router();

// add authentication middlewares
router.use(authenticationController.protect);
router.use(authenticationController.restrictTo('admin'));

router.get('/', authenticationController.getMe);

router
  .route('/item')
  .get(itemController.getItems)
  .post(uploadPhoto.array('images'), itemController.addItem);

router
  .route('/item/:id')
  .get(itemController.getItem)
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

router.get('/user', adminController.getAllUsers);

// TODO get information about particular user
router.route('/user/:id').get();

// TODO get orders of the current user
router.get('/user/:id/order');

// TODO get payement of current user
router.get('/user/:id/payement');

// TODO update payement status of the user
router.patch('/user/:id/payement/:id');

// TODO view and delete orders
router.route('/user/:id/order/:id').get().delete();

// TODO get order and payement information
router.get('/order');
// get all orders
router.get('/order/all');

// TODO get pending payments
router.get('/payement');
// get all payements
router.get('/payement/all');

// TODO edit role of the user
router.patch('/users/:id/editRoles');

// TODO get order summary and information
router.get('/orderInsights');

// TODO get payement insights
router.get('/payementInsights');

module.exports = router;

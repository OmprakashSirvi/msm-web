const express = require('express');

const orderController = require('../controllers/orderController');

const router = express.Router();

router.route('/').get(orderController.getPendingOrders).post(orderController.placeOrder);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

router.get('/all', orderController.getAllOrders);

module.exports = router;

/** @format */

const cors = require('cors');
const express = require('express');

const router = express.Router();

const itemController = require('../controllers/itemsController');

router.get('/', cors(), itemController.getItems);
router.get('/:id', itemController.getItem);

module.exports = router;

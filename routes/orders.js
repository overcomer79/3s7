const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orders')

router.get('/', orderController.orders_get_all);
router.get('/:orderId', orderController.orders_get_order_by_id);
router.post('/', orderController.orders_create_order);
router.delete('/:orderId', orderController.orders_delete_order_by_id);

module.exports = router;
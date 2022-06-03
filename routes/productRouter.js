const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(productController.getRestaurant)
    .post(productController.postRestaurant);

router.route('/itemsdata').post(productController.getItems);
router.route('/:metadataId').get(productController.getMenu);

module.exports = router;

// Restaurant and Menu

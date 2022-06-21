const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(authMiddleware.checkUser, productController.getRestaurant)
    .post(productController.postRestaurant);

router.route('/itemsdata').post(productController.getItems);
router
    .route('/oders')
    .get(authMiddleware.checkUser, productController.getOders);
router.route('/:resId').get(productController.getMenu);

module.exports = router;

// Restaurant and Menu

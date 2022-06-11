const express = require('express');
const oderController = require('../controllers/oderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router({ mergeParams: true });

router.route('/place').post(authMiddleware.checkUser, oderController.postOder);

module.exports = router;

// Oder

const express = require('express');
const oderController = require('../controllers/oderController');

const router = express.Router({ mergeParams: true });

router.route('/place').post(oderController.postOder);

module.exports = router;

// Oder

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const venderController = require('../controllers/venderController');

const router = express.Router({ mergeParams: true });

router.route('/me').get(authMiddleware.checkUser, venderController.getMe);
// inStock
router
    .route('/menus/updateitem')
    .patch(authMiddleware.checkUser, venderController.updateItem);

module.exports = router;

const Restaurant = require('../model/restaurantModel');
const Menu = require('../model/menuModel');

exports.getMe = async (req, res, next) => {
    const { resId } = req.user;
    const restaurant = await Restaurant.findById(resId);

    res.status(200).json({
        status: 'success',
        data: {
            restaurant,
        },
    });
};

exports.updateItem = async (req, res, next) => {
    const { id } = req.query;
    const data = await Menu.findByIdAndUpdate(id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            data,
        },
    });
};

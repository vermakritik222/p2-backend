const Restaurant = require('../model/restaurantModel');
const Menu = require('../model/menuModel');
const RestaurantMetadata = require('../model/restaurantMetadata');
const res = require('express/lib/response');
// const Oder = require('../model/oderModel');

exports.getRestaurant = async (req, res, next) => {
    try {
        const doc = await Restaurant.find();

        res.status(200).json({
            status: 'success',
            data: doc,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.postRestaurant = async (req, res, next) => {
    const data = req.body;
    const menu = req.body.Menu;
    delete data.Menu;
    const menuArr = [];

    try {
        for (let key in menu) {
            const mewMenu = await Menu.create(menu[key]);
            menuArr.push(mewMenu._id);
        }

        const newRestaurantMetadata = await RestaurantMetadata.create({
            Menu: menuArr,
        });

        data.RestaurantMetadataID = newRestaurantMetadata._id;

        const newRestaurant = await Restaurant.create(data);
        newRestaurantMetadata.RestaurantID = newRestaurant._id;

        await newRestaurantMetadata.save();

        res.status(200).json({
            status: 'success',
            data: {
                Restaurant: newRestaurant,
                RestaurantMetadata: newRestaurantMetadata,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: 'failed to creat document please try again aster sometime',
        });
    }
};

exports.getMenu = async (req, res, next) => {
    const { metadataId } = req.params;
    try {
        const metadata = await RestaurantMetadata.findById(metadataId);
        const doc = await Menu.find({
            _id: { $in: metadata.Menu },
        });

        res.status(200).json({
            status: 'success',
            Menu: doc,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: 'failed to send document please try again aster sometime',
        });
    }
};

exports.getItems = async (req, res) => {
    const { oderIds } = req.body;

    try {
        const doc = await Menu.find({
            _id: {
                $in: oderIds,
            },
        });

        res.status(200).json({
            status: 'success',
            length: doc.length,
            data: doc,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: 'failed to send document please try again aster sometime',
        });
    }
};

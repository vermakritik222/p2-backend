const Restaurant = require('../model/restaurantModel');
const Menu = require('../model/menuModel');
const Oder = require('../model/oderModel');

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
        const newRestaurant = await Restaurant.create(data);

        for (let key in menu) {
            menu[key].redId = newRestaurant._id;
            const mewMenu = await Menu.create(menu[key]);
            menuArr.push(mewMenu._id);
        }
        newRestaurant.Menu = menuArr;

        await newRestaurant.save();

        res.status(200).json({
            status: 'success',
            data: {
                Restaurant: newRestaurant,
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
    const { resId } = req.params;

    try {
        const resdata = await Restaurant.findById(resId);

        const doc = await Menu.find({
            _id: { $in: resdata.Menu },
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

exports.getOders = async (req, res, next) => {
    const { resId } = req.user;
    const { status } = req.query;
    console.log(status);
    const data = await Oder.find({ redId: resId, status: status });
    res.status(200).json({
        status: 'success',
        Oder: data,
    });
};

exports.getItem = async (req, res, next) => {
    const { ids } = req.body;
    console.log(ids);
    const data = await Menu.find({ _id: { $in: ids } });

    res.status(200).json({
        status: 'success',
        data,
        ids,
    });
};

exports.updateStatus = async (req, res, next) => {
    const { id } = req.query;
    // const { data } = req.body;

    const doc = await Oder.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            data: doc,
        },
    });
};

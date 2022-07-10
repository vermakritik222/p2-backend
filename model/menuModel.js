const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    DishName: {
        type: String,
        required: true,
    },
    Img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    vg_ng: {
        type: Boolean,
        required: true,
    },
    Rating: {
        type: Number,
        required: true,
    },
    Description: {
        type: String,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    redId: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

const Menu = mongoose.model('menu', menuSchema);

module.exports = Menu;

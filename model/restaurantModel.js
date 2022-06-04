const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    RestaurantName: {
        required: true,
        type: String,
    },
    logo: String,
    CoverImg: {
        required: true,
        type: String,
    },
    Location: {
        required: true,
        type: String,
    },
    FullAdders: {
        required: true,
        type: String,
    },
    Description: String,
    Rating: Number,
    SpecialDiscount: Array,
    SpecialDiscountDescription: String,

    MenuCatagories: {
        required: true,
        type: Array,
    },
    Menu: {
        type: Array,
        required: true,
    },
});

const Restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = Restaurant;

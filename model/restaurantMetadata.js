const mongoose = require('mongoose');

const restaurantMetadataSchema = new mongoose.Schema({
    RestaurantID: {
        type: String,
    },
    Menu: {
        type: Array,
        required: true,
    },
});

const restaurantMetadata = mongoose.model(
    'restaurantMetadata',
    restaurantMetadataSchema
);

module.exports = restaurantMetadata;

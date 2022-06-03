const mongoose = require('mongoose');

const oderSchema = new mongoose.Schema({
    RestaurantID: {
        type: String,
        required: true,
    },
    MenuID: {
        type: String,
        required: true,
    },
    Oders: {
        type: Array,
    },
});

const Oder = mongoose.model('Oder', oderSchema);

module.exports = Oder;

const mongoose = require('mongoose');

const oderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    redId: {
        type: String,
        required: true,
    },
    oderId: {
        type: Array,
        required: true,
    },
});

const Oder = mongoose.model('Oder', oderSchema);

module.exports = Oder;

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
    paymentStatus: {
        type: String,
    },
    oderName: {
        type: String,
    },
});

oderSchema.pre('save', async function (next) {
    this.placedAt = new Date();
    next();
});

const Oder = mongoose.model('Oder', oderSchema);

module.exports = Oder;

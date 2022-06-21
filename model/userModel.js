const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const p2userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!!!! '],
    },
    photo: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        require: [true, 'enter an email'],
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    role: {
        type: String,
        require: [true, 'enter an role'],
        enum: {
            values: ['user', 'vender'],
        },
        default: 'user',
    },
    resId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    password: {
        type: String,
        required: [true, 'Please creat an password'],
        minlength: [6, 'A password must have 6 characters'],
        select: false,
    },
    passwordConformation: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'password are not same',
        },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

p2userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConformation = undefined;

    next();
});

p2userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

p2userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

p2userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

p2userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamps = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamps;
    }
    return false;
};

const p2user = mongoose.model('p2user', p2userSchema);

module.exports = p2user;

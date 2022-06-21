const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.creatSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // httpOnly: true,
    };

    const userData = {
        username: user.name,
        email: user.email,
        photo: user.photo,
        resId: user.resId,
        role: user.role,
    };

    res.status(statusCode).cookie('p2jwt', token, cookieOptions).json({
        status: 'success',
        // token,
        user: userData,
    });
};

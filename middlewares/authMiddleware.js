const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.checkUser = async (req, res, next) => {
    // 1) getting token and check of its there
    try {
        let token;
        if (req.cookies !== null) {
            token = req.cookies.p2jwt;
        }

        if (!token) {
            res.status(401).json({
                status: 'auth fail',
                message: 'You are not longed in! Pleas log in to get access.',
            });
            return;
        }

        // 2) verification of token
        const decode = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decode.id);
        if (!user) {
            res.status(401).json({
                status: 'auth fail',
                message: 'The token belonged to this User is no longer exist.',
            });
            return;
        }

        // 4) check if user changed pas after the token was issued
        if (await user.changedPasswordAfter(decode.iat)) {
            res.status(401).json({
                status: 'auth fail',
                message: 'User has changed there Password! please login again',
            });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'fail',
            message: 'please enter password and user name',
            error,
        });
    }
};

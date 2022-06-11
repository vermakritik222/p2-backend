const User = require('../model/userModel');
const tokenServices = require('../service/tokenServices');

exports.signup = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        tokenServices.creatSendToken(user, 201, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: 'failed to send document please try again aster sometime',
        });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);
    if (!email || !password) {
        res.status(404).json({
            status: 'fail',
            message: 'please enter password and user name',
        });
        return;
        // return next(new AppError('please enter password and user name', 404));
    }

    const user = await User.findOne({ email: req.body.email }).select(
        '+password'
    );

    if (!user || !user.correctPassword(password, user.password)) {
        res.status(404).json({
            status: 'fail',
            message: 'Incurrent email or password',
        });
        return;
        // return next(new AppError('Incurrent email or password'));
    }
    tokenServices.creatSendToken(user, 202, res);
};

const User = require('../model/userModel');
const tokenServices = require('../service/tokenServices');

exports.signup = async (req, res, next) => {
    const user = await User.create(req.body);
    tokenServices.creatSendToken(user, 201, res);
};

// exports.login = async (req, res, next) => {
//     const { email, password } = req.body;

//     if (!email || !password)
//         return next(new AppError('please enter password and user name', 404));

//     const user = await User.findOne({ email: req.body.email }).select(
//         '+password'
//     );

//     if (!user || !user.correctPassword(password, user.password))
//         return next(new AppError('Incurrent email or password'));
//     tokenServices.creatSendToken(user, 202, res);
// };

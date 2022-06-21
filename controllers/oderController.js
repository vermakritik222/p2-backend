const dataHandlingService = require('../service/dataHandlingService');
const Oder = require('../model/oderModel');

exports.postOder = async (req, res) => {
    const {
        oder,
        oderDetails,
        AmountPaid,
        TotalAmount,
        BalanceAmount,
        Discount,
        paymentStatus,
        oderName,
    } = req.body;
    console.log(req.body);
    const userId = `${req.user._id}`;
    const gropedData = dataHandlingService.groupBy(oderDetails, 'redId');
    const postData = Object.getOwnPropertyNames(gropedData).map((el) => {
        const oderId = gropedData[el].map((el) => el._id);
        return {
            userId,
            redId: el,
            oderId,
            paymentStatus,
            oderName,
        };
    });
    console.log(postData);
    try {
        for (let idx = 0; idx < postData.length; idx++) {
            const doc = await Oder.create(postData[idx]);
        }

        res.status(200).json({
            status: 'success',
            message: 'oder has ben placed successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: 'failed to send document please try again aster sometime',
        });
    }
};

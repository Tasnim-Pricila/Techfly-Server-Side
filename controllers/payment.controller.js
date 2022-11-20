const { createPaymentServices } = require("../services/payment.services")

exports.createPayment = async (req, res, next) => {
    try {
        const result = await createPaymentServices(req.body);
        res.status(200).send({
            status: 'success',
            message: ' Successfully get the Purchase',
            data: { clientSecret: result.client_secret }
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' Failed to get the payment',
            error: error.message
        })
    }

}
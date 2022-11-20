const { createPurchaseServices, getPurchaseServices, getPurchaseByIdServices, deletePurchaseByIdServices, updatePurchaseByIdServices } = require("../services/purchase.services");


exports.createPurchase = async (req, res, next) => {
    try {
        const result = await createPurchaseServices(req.body);
        res.status(200).send({
            status: 'success',
            message: ' Successfully created the Purchase',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to create the Purchase',
            error: error.message
        })
    }
}
exports.getPurchases = async (req, res, next) => {
    try {
        const result = await getPurchaseServices(req.query);
        res.status(200).send({
            status: 'success',
            message: ' Successfully get Purchases',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: 'Failed to get Purchases',
            error: error.message
        })
    }

}
exports.getPurchasesById = async (req, res, next) => {
    try {
        const result = await getPurchaseByIdServices(req.params.id);
        res.status(200).send({
            status: 'success',
            message: ' Successfully get the Purchase',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' Failed to get the Purchase',
            error: error.message
        })
    }
}
exports.deletePurchaseById = async (req, res, next) => {
    try {
        const result = await deletePurchaseByIdServices(req.params.id);
        res.status(200).send({
            status: 'success',
            message: ' Successfully deleted the Purchase',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to delete the Purchase',
            error: error.message
        })
    }
}

exports.updatePurchaseById = async (req, res, next) => {
    try {
        const result = await updatePurchaseByIdServices(req.params.id, req.body);
        res.status(200).send({
            status: 'success',
            message: ' Successfully update the car',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to update car',
            error: error.message
        })
    }
}
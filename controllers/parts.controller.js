const { createPartServices, getPartServices, getPartByIdServices, deletePartByIdServices } = require("../services/parts.services");

exports.createPart = async (req, res, next) => {
    try {
        const result = await createPartServices(req.body);
        res.status(200).send({
            status: 'success',
            message: ' Successfully created the Part',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to create the Part',
            error: error.message
        })
    }
}
exports.getParts = async (req, res, next) => {
    try {
        const result = await getPartServices();
        res.status(200).send({
            status: 'success',
            message: ' Successfully get Parts',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: 'Failed to get Parts',
            error: error.message
        })
    }

}
exports.getPartsById = async (req, res, next) => {
    try {
        const result = await getPartByIdServices(req.params.id);
        res.status(200).send({
            status: 'success',
            message: ' Successfully get the Part',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' Failed to get the Part',
            error: error.message
        })
    }
}
exports.deletePartById = async (req, res, next) => {
    try {
        const result = await deletePartByIdServices(req.params.id);
        res.status(200).send({
            status: 'success',
            message: ' Successfully deleted the Part',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to delete the Part',
            error: error.message
        })
    }
}
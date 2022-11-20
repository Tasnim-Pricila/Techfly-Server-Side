const { getUserServices, updateUserByEmailServices, makeAdminServices, adminOrNotServices, getUserByEmailServices, upsertUserByEmailServices } = require("../services/user.services");

exports.getUsers = async (req, res, next) => {
    try {
        const result = await getUserServices();
        res.status(200).send({
            status: 'success',
            message: ' Successfully get Users',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: 'Failed to get Users',
            error: error.message
        })
    }

}
exports.getUserByEmail = async (req, res, next) => {
    try {
        const result = await getUserByEmailServices(req.params.email);
        res.status(200).send({
            status: 'success',
            message: ' Successfully get the User',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' Failed to get the User',
            error: error.message
        })
    }
}
exports.updateUserByEmail = async (req, res, next) => {
    try {
        const result = await updateUserByEmailServices(req.params.email, req.body);
        res.status(200).send({
            status: 'success',
            message: ' Successfully update the user',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to update user',
            error: error.message
        })
    }
}
exports.makeAdmin = async (req, res, next) => {
    try {
        const result = await makeAdminServices(req.params.email);
        res.status(200).send({
            status: 'success',
            message: ' Successfully made admin',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: 'Failed to made admin',
            error: error.message
        })
    }
}
exports.adminOrNot = async (req, res, next) => {
    try {
        const result = await adminOrNotServices(req.params.email);
        res.status(200).send({
            status: 'success',
            message: 'Successfully made admin',
            data: { admin: result }
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: 'Failed to made admin',
            error: error.message
        })
    }
}
exports.upsertUser = async (req, res, next) => {
    try {
        const result = await upsertUserByEmailServices(req.params.email, req.body);
        res.status(200).send({
            status: 'success',
            message: ' Successfully update the user',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to update user',
            error: error.message
        })
    }
}
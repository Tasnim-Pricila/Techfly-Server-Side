const { createReviewServices, getReviewServices } = require("../services/review.services");

exports.createReview = async (req, res, next) => {
    try {
        const result = await createReviewServices(req.body);
        res.status(200).send({
            status: 'success',
            message: ' Successfully created the Review',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to create the Review',
            error: error.message
        })
    }
}
exports.getReviews = async (req, res, next) => {
    try {
        const result = await getReviewServices(req.query);
        res.status(200).send({
            status: 'success',
            message: ' Successfully get Reviews',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: 'Failed to get Reviews',
            error: error.message
        })
    }

}
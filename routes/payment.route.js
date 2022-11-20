const paymentController = require("../controllers/payment.controller");
const express = require('express');
const verifyJWT = require("../middleware/verifyToken");
const paymentRoute = express.Router();

paymentRoute.route('/')
    .post(verifyJWT, paymentController.createPayment)

module.exports = paymentRoute;
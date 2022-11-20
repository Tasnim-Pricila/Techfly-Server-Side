const purchaseController = require("../controllers/purchase.controller");
const express = require('express');
const verifyJWT = require("../middleware/verifyToken");
const purchaseRoute = express.Router();

purchaseRoute.route('/')
    .get(verifyJWT, purchaseController.getPurchases)
    .post(verifyJWT, purchaseController.createPurchase)

purchaseRoute.route('/:id')
    .get(verifyJWT, purchaseController.getPurchasesById)
    .delete(verifyJWT, purchaseController.deletePurchaseById)
    .patch(verifyJWT, purchaseController.updatePurchaseById)

module.exports = purchaseRoute;
const userController = require("../controllers/user.controller");
const express = require('express');
const verifyJWT = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const userRoute = express.Router();

userRoute.route('/')
    .get(verifyJWT, verifyAdmin, userController.getUsers)

userRoute.route('/admin/:email')
    .put(verifyJWT, verifyAdmin, userController.makeAdmin)

userRoute.route('/isAdmin/:email')
    .get(verifyJWT, userController.adminOrNot)

userRoute.route('/:email')
    .patch(verifyJWT, userController.updateUserByEmail)
    .get(verifyJWT, userController.getUserByEmail)
    .put(userController.upsertUser)

module.exports = userRoute;
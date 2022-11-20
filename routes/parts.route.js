const partController = require("../controllers/parts.controller");
const express = require('express');
const verifyJWT = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const partRoute = express.Router();

partRoute.route('/')
    .get(partController.getParts)
    .post(verifyJWT, verifyAdmin, partController.createPart)

partRoute.route('/:id')
    .get(partController.getPartsById)
    .delete(verifyJWT, verifyAdmin, partController.deletePartById)

module.exports = partRoute;
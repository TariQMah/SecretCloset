const express = require("express");
const { createDesigner, updateDesigner } = require("../controllers/designer");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/create").post(isAuthenticated, createDesigner)

router.route("/update").post(isAuthenticated, updateDesigner)

module.exports = router
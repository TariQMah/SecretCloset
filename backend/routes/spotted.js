const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { createSpotted, createSpottedCategory, updateSpotted } = require("../controllers/spotted");
const router = express.Router();

router.route("/create").post(isAuthenticated, createSpotted)
router.route("/update").post(isAuthenticated, updateSpotted)
router.route("/category/create").post(isAuthenticated, createSpottedCategory)


module.exports = router
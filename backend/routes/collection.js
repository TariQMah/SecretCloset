const express = require("express");
const { createCollection } = require("../controllers/collection");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/create").post(isAuthenticated, createCollection)

module.exports = router
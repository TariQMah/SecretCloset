import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createSpotted, createSpottedCategory, updateSpotted, updateSpottedCategory, getAllSpotted, deleteSpottedCategory, getAllSpottedCategories, deleteSpotted } from "../controllers/spotted.js";
const router = express.Router();

router.route("/create").post(isAuthenticated, createSpotted)
router.route("/getAll").get(isAuthenticated, getAllSpotted)
router.route("/update").post(isAuthenticated, updateSpotted)
router.route("/delete").post(isAuthenticated, deleteSpotted)


router.route("/category/create").post(isAuthenticated, createSpottedCategory)
router.route("/category/delete").delete(isAuthenticated, deleteSpottedCategory)
router.route("/category/update").delete(isAuthenticated, updateSpottedCategory)
router.route("/category/getAll").get(isAuthenticated, getAllSpottedCategories)


export default router
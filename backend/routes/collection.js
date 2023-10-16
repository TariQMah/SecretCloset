import express from "express";
import { createCollection } from "../controllers/collection.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/create").post(isAuthenticated, createCollection)

export default router
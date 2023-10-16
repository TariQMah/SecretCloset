import express from "express";
import { createDesigner, updateDesigner } from "../controllers/designer.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/create").post(isAuthenticated, createDesigner)

router.route("/update").post(isAuthenticated, updateDesigner)

export default router
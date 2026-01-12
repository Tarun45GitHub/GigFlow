import express from "express";
import auth from "../middlewares/authMiddleware.js";
import { getGigs, createGig } from "../controllers/gigController.js";
const router = express.Router();

router.get("/", getGigs);
router.post("/", auth, createGig);
export default router;

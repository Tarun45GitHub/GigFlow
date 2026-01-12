import express from "express";
import auth from "../middlewares/authMiddleware.js";
import { createBid, getBids, hireBid } from "../controllers/bidController.js";

const router = express.Router();
router.post("/", auth, createBid);
router.get("/:gigId", auth, getBids);
router.patch("/:bidId/hire", auth, hireBid);

export default router;

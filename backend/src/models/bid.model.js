import mongoose from "mongoose";
import { Schema } from "mongoose";

const bidSchema = new mongoose.Schema({
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig" },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  price: Number,
  status: {
    type: String,
    enum: ["pending", "hired", "rejected"],
    default: "pending"
  }
});

export const BidSchema= mongoose.model("Bids",bidSchema);
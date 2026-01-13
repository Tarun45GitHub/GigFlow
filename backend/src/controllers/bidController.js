import {BidSchema as Bid} from "../models/bid.model.js";
import {GigSchema as Gig} from "../models/gig.model.js";
import mongoose from "mongoose";

export const createBid = async (req, res) => {
  const bid = await Bid.create({
    ...req.body,
    freelancerId: req.user.id
  });
  res.json(bid);
};

export const getBids = async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId });
  res.json(bids);
};

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);
    const gig = await Gig.findOne({ _id: bid.gigId, status: "open" }).session(session);

    if (!gig) throw new Error("Gig already assigned");

    await Gig.updateOne({ _id: gig._id }, { status: "assigned" }).session(session);
    await Bid.updateOne({ _id: bid._id }, { status: "hired" }).session(session);
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" }
    ).session(session);

    await session.commitTransaction();
    res.json({ msg: "Freelancer hired" });
  } catch {
    await session.abortTransaction();
    res.status(400).json({ msg: "Hiring failed" });
  }
};



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function GigDetails() {
  const { id } = useParams();
  const [bids, setBids] = useState([]);

  useEffect(() => {
    api.get(`/api/bids/${id}`).then(res => setBids(res.data));
  }, []);

  const submitBid = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    await api.post("/api/bids", { ...data, gigId: id });
    alert("Bid submitted");
  };

  const hire = async (bidId) => {
    await api.patch(`/api/bids/${bidId}/hire`);
    alert("Freelancer hired");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={submitBid} className="bg-white p-4 rounded shadow space-y-3">
        <h3 className="font-bold text-lg">Submit a Bid</h3>
        <input name="message" placeholder="Your message" className="w-full border p-2 rounded" />
        <input name="price" placeholder="Your price" className="w-full border p-2 rounded" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Submit Bid
        </button>
      </form>

      <h3 className="mt-6 font-bold text-lg">Bids</h3>

      {bids.map(bid => (
        <div key={bid._id} className="bg-white p-4 mt-3 rounded shadow flex justify-between items-center">
          <div>
            <p>{bid.message}</p>
            <p className="text-sm text-gray-600">₹{bid.price}</p>
          </div>

          {bid.status === "pending" && (
            <button
              onClick={() => hire(bid._id)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Hire
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

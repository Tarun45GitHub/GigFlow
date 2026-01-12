import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    api.get("/api/gigs").then(res => setGigs(res.data));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Open Gigs</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {gigs.map(gig => (
          <div key={gig._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{gig.title}</h3>
            <p className="text-gray-600 mt-1">{gig.description}</p>

            <div className="flex justify-between items-center mt-3">
              <span className="font-semibold">₹{gig.budget}</span>
              <Link
                to={`/gig/${gig._id}`}
                className="text-indigo-600 hover:underline"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

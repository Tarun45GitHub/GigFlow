import api from "../api/axios";

export default function PostGig() {
  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    await api.post("/api/gigs", data);
    alert("Gig posted successfully");
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow-md w-125 space-y-4">
        <h2 className="text-2xl font-bold text-indigo-600">Post a New Gig</h2>

        <input name="title" placeholder="Gig Title" className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="Gig Description" className="w-full border p-2 rounded"></textarea>
        <input name="budget" placeholder="Budget" className="w-full border p-2 rounded" />

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Post Gig
        </button>
      </form>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">GigFlow</h1>

      <div className="flex gap-4">
        <Link to="/" className="hover:text-indigo-600">Gigs</Link>
        <Link to="/post" className="hover:text-indigo-600">Post Gig</Link>
        <Link to="/login" className="hover:text-indigo-600">Login</Link>
        <Link to="/register" className="hover:text-indigo-600">Register</Link>
      </div>
    </nav>
  );
}

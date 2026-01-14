import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  console.log(user);
  
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">GigFlow</h1>

      <div className="flex gap-4">
        <Link to="/" className="hover:text-indigo-600">Gigs</Link>
        <Link to="/post" className="hover:text-indigo-600">Post Gig</Link>

        {user ? (
          <>
            {/* Show username */}
            <span className="text-indigo-600 font-medium">
              {user.name}
            </span>

            {/* Logout button */}
            <button
              onClick={onLogout}
              className="hover:text-indigo-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Show login / register when NOT logged in */}
            <Link to="/login" className="hover:text-indigo-600">Login</Link>
            <Link to="/register" className="hover:text-indigo-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

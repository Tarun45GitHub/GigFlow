import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import Gigs from "./pages/Gigs";
import GigDetails from "./pages/GigDetails";
import PostGig from "./pages/PostGig";
import Navbar from "./components/navbar";
import React, { useState, useEffect } from "react";





function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage on app load
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ name: username });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);  // trigger Navbar update
  };

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Gigs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<PostGig />} />
        <Route path="/gig/:id" element={<GigDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

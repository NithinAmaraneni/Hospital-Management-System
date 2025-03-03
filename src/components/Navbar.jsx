import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';

const Navbar = ({ isAdmin, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        
        setIsLoggedIn(false);
        navigate("/");
      } else {
        console.error("Failed to sign out");
      }
    } catch (err) {
      console.error("An error occurred during sign-out", err);
    }
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">HMS</h1>
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/view-hospitals" className="hover:underline">
          View Hospitals
        </Link>
        {isAdmin && (
          <Link to="/edit-hospitals" className="hover:underline">
            Edit Hospitals
          </Link>
        )}
        {isAdmin && (
          <Link to="/add-hospitals" className="hover:underline">
            Add Hospitals
          </Link>
        )}
      </div>
      <div>
        {!isLoggedIn ? (
          <div className="flex space-x-4">
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </div>
        ) : (
          <button onClick={handleSignOut} className="hover:underline">
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
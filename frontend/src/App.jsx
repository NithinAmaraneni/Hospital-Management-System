import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ViewHospitals from "./pages/ViewHospitals";
import EditHospitals from "./pages/EditHospitals";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddHospitals from "./pages/AddHospitals";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check login status from local storage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");

    setIsLoggedIn(loggedIn);
    setIsAdmin(role === "admin");
  }, []);

  // Create a function to handle login state changes
  const handleLoginState = (isLoggedIn, role) => {
    setIsLoggedIn(isLoggedIn);
    setIsAdmin(role === "admin");
    
    // Update localStorage
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);
    }
  };

  return (
    <Router>
      <Navbar isAdmin={isAdmin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-hospitals" element={<ViewHospitals />} />
        {isAdmin && <Route path="/edit-hospitals" element={<EditHospitals />} />}
        {isAdmin && <Route path="/add-hospitals" element={<AddHospitals />} />}
        {!isLoggedIn && <Route path="/login" element={<Login handleLoginState={handleLoginState} />} />}
        {!isLoggedIn && <Route path="/signup" element={<Signup />} />}
      </Routes>
    </Router>
  );
};

export default App;
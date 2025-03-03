import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ handleLoginState }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedData = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    if (!trimmedData.email || !trimmedData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("https://hospital-management-system-tfw9.onrender.com/api/auth/login", trimmedData, { withCredentials: true });

      alert(response.data.successmessage);
      
      // Extract role from the response
      const role = response.data.successmessage.includes("admin") ? "admin" : "user";
      
      // Use the handleLoginState function to update both login status and role
      handleLoginState(true, role);
      
      navigate("/");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.errormessage || "Login failed");
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 mb-2 w-full rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 mb-4 w-full rounded"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
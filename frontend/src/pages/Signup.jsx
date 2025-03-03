import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    
    try {
      const response = await axios.post("https://hospital-management-system-tfw9.onrender.com/api/auth/signup", formData);
      setMessage(response.data.successmessage);
    } catch (error) {
      setError(error.response?.data?.errormessage || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        {message && <p className="text-green-600 mb-2 text-center">{message}</p>}
        {error && <p className="text-red-600 mb-2 text-center">{error}</p>}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="border p-2 mb-2 w-full rounded"
          value={formData.fullName}
          onChange={handleChange}
        />
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
          className="border p-2 mb-2 w-full rounded"
          value={formData.password}
          onChange={handleChange}
        />
        <select
          name="role"
          className="border p-2 mb-4 w-full rounded"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700 transition"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
import React, { useState } from "react";
import axios from "axios";

const AddHospitals = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  const specialityOptions = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology"];

  const handleSpecialityChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSpecialities(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHospital = { name, city, imageUrl, specialities, rating };

    try {
      const response = await axios.post("https://hospital-management-system-tfw9.onrender.com/api/auth/add-hospital", newHospital);
      setMessage(response.data.message);
      // Reset form
      setName("");
      setCity("");
      setImageUrl("");
      setSpecialities([]);
      setRating("");
    } catch (error) {
      setMessage("Failed to add hospital");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Add Hospital</h2>
      {message && <p className="text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Hospital Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2"
          required
        />
        <select multiple value={specialities} onChange={handleSpecialityChange} className="border p-2">
          {specialityOptions.map((speciality) => (
            <option key={speciality} value={speciality}>
              {speciality}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2"
          min="1"
          max="5"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Add Hospital
        </button>
      </form>
    </div>
  );
};

export default AddHospitals;
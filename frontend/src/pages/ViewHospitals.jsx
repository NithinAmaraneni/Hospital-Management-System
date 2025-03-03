import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("https://hospital-management-system-tfw9.onrender.com/api/hospitals");
        setHospitals(response.data);
      } catch (err) {
        setError("Error fetching hospitals");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div>
      <h2>Hospitals List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital._id}>
            <h3>{hospital.name}</h3>
            <p>City: {hospital.city}</p>
            <p>Specialities: {hospital.specialities.join(", ")}</p>
            <p>Rating: {hospital.rating}</p>
            {hospital.imageUrl && <img src={hospital.imageUrl} alt={hospital.name} width="200" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewHospitals;
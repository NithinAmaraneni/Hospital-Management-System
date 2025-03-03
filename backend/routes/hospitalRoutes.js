const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");
const User = require("../models/User");

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const userId = req.cookies?.user_id;
  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  const userId = req.cookies?.user_id;
  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new hospital
router.post("/add-hospital", async (req, res) => {
  try {
    const { name, city, imageUrl, specialities, rating } = req.body;
    
    // Create new hospital
    const newHospital = new Hospital({
      name,
      city,
      imageUrl,
      specialities,
      rating: Number(rating) // Convert to number to ensure proper type
    });
    
    // Save to database
    await newHospital.save();
    
    res.status(201).json({ 
      success: true, 
      message: "Hospital added successfully",
      hospital: newHospital
    });
  } catch (error) {
    console.error("Error adding hospital:", error);
    
    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ 
        success: false, 
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Server error while adding hospital" 
    });
  }
});

router.get("/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ message: "Server error while fetching hospitals" });
  }
});


module.exports = router;
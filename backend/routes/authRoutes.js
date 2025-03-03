const express = require("express");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const User = require("../models/User");

const app = express();
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser to parse cookies

// Signup Route
app.post("/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ errormessage: "All fields are required" });
  }

  try {
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({ errormessage: "Email already exists" });
    }

    const newUser = new User({
      fullName,
      email,
      password, // Password will be hashed automatically via pre("save")
      role: role || "user", // Default role to "user" if not provided
    });

    await newUser.save();
    res.status(201).json({ successmessage: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ errormessage: "Error registering user" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ errormessage: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ errormessage: "Email not found!" });
    }

    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if (!checkPassword) {
      return res.status(401).json({ errormessage: "Password is incorrect!" });
    }

    // Set cookies
    res.cookie("user_id", existingUser._id.toString(), {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({ successmessage: `${existingUser.role} login successful` });
  } catch (error) {
    console.error("Error occurred while logging in:", error);
    res.status(500).json({ errormessage: "Error while user logging in!" });
  }
});

// Sign Out Route
app.post("/signOut", async (req, res) => {
  try {
    console.log("Cookies received:", req.cookies); // Debugging

    const userId = req.cookies?.user_id; // Use optional chaining to avoid errors
    if (!userId) {
      return res.status(400).json({ message: "No user is signed in." });
    }

    res.clearCookie("user_id", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({ message: "Successfully signed out" });
  } catch (err) {
    console.error("Error during sign out:", err);
    res.status(500).json({ message: "Error signing out" });
  }
});

module.exports = app;
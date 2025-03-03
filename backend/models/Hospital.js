const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hospital name is required"],
      trim: true
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true
    },
    specialities: {
      type: [String],
      required: [true, "At least one speciality is required"],
      validate: {
        validator: function(array) {
          return array.length > 0;
        },
        message: "Please select at least one speciality"
      }
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"]
    }
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
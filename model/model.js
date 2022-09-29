const mongoose = require("mongoose");

const studentForm = new mongoose.Schema(
  {
    id: {
      type: Number,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      require: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentForm);

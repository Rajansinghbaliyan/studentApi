const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please enter the name"],
    minlength: 5,
    maxlength: 16,
    validate: [validator.isAlpha, "Please enter only Alphabets"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please enter the email"],
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minlength: 8,
    select: false,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  address: {
    type: String,
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  register_at: {
    type: Date,
    default: Date.now(),
  },
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

studentSchema.methods.checkPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

studentSchema.index({ location: "2dsphere" });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

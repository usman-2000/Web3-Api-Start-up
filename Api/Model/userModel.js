const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { unique } = require("next/dist/build/utils");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email address"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide us a suitable password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],

    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same",
    },
  },
});

userSchema.pre("save", async function (next) {
  // Only run if password was actually modified
  if (!this.isModified("password")) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete confirm password
  this.passwordConfirm = undefined;
  next();
});

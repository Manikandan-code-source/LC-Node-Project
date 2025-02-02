const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [6, "Name must be at least 6 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be a 10-digit number"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      minlength: [4, "Subject must be at least 4 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [10, "Message must be at least 10 characters"],
    },
  },
  { timestamps: true } 
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;

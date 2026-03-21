import mongoose, { Schema, model, models } from "mongoose";

const ContactSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = models.Contact || model("Contact", ContactSchema);

export default Contact;

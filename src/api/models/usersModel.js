import mongoose from "mongoose";
import db from "../../database/index.js";

const userSchema = new mongoose.Schema({
  name: { type: String },
  profilePic: { type: String },
  email: { type: String },
  companyName: { type: String },
  address: { type: String },
  state: { type: String },
  country: { type: String },
  zip: { type: String },
  taxId: { type: String },
  isAccountVerified: { type: Boolean, default: false },
  password: { type: String, select: false },
  phone: { type: String },
  companyName: { type: String, default: "" },
  accountId: { type: String },
  profilePic: {
    type: String,
    default:
      "https://milodocs.blob.core.windows.net/public-docs/profile-picture.webp",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  role: { type: String, default: "user" },
  vectorStoreMetadata: { type: Object },
  chatbots: [
    {
      type: Object,
    },
  ],
  isOnboarded: { type: Boolean, default: false },
  onboardingStep: { type: Number, default: 0 },
  customerId: { type: String },
  planId: { type: String },
  subscriptionId: { type: String },
  meeting:{type:Object}
});

const Users = db.model("users", userSchema);

export default Users;

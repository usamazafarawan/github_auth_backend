import mongoose from "mongoose";
import db from "../../database/index.js";

const userSchema = new mongoose.Schema({
  name: { type: String },
  password: { type: String, select: false },
  email: { type: String },
});

const Users = db.model("users", userSchema);

export default Users;

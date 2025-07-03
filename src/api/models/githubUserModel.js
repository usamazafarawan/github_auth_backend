import mongoose from "mongoose";
import db from "../../database/index.js";

const gitUserSchema = new mongoose.Schema({
  name: { type: String },
  gitToken: { type: String, select: false },
  gitId: { type: String },
});

const GitUsers = db.model("gitUsers", gitUserSchema);

export default GitUsers;

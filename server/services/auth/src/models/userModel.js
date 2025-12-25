import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  },
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },
  role:{
    type: String,
    enum: ["ADMIN","USER","SALER","DELIVERY"],
    default: "USER"
  }
  
}, { timestamps: true });

const User= mongoose.model("User", userSchema);

export default User;
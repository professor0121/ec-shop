import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  originalName: String,
  type: String,
  mimeType: String,
  size: Number,
  url: String,
  secureUrl: String,
  publicId: String,
  provider: { type: String, default: "CLOUDINARY" },
  uploadedBy: String,
  usedBy: {
    service: String,
    entityId: String
  }
}, { timestamps: true });

const Media = mongoose.model("Media", mediaSchema);

export default Media;
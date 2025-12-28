import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,

  price: { type: Number, required: true },
  discountPrice: Number,

  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },

  media: {
    images: [String],
    videos: [String],
    audios: [String],
    documents: [String]
  },

  categoryId: { type: String },
  createdBy: { type: String }

}, { timestamps: true });

/* 🔥 Indexes for optimization */
productSchema.index({ isActive: 1, createdAt: -1 });
productSchema.index({ categoryId: 1 });
productSchema.index({ price: 1 });
productSchema.index({ title: "text", description: "text" });

export const Product = mongoose.model("Product", productSchema);

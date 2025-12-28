import { Product } from "../models/product.model.js";
import slugify from "slugify";

export const productService = {

  createProduct: async (data, userId) => {
    return Product.create({
      ...data,
      slug: slugify(data.title, { lower: true }),
      createdBy: userId
    });
  },

  getProducts: async ({ categoryId, minPrice, maxPrice, cursor, limit }) => {
    const query = {
      isActive: true,
      ...(categoryId && { categoryId }),
      ...(minPrice && maxPrice && {
        price: { $gte: minPrice, $lte: maxPrice }
      }),
      ...(cursor && { _id: { $lt: cursor } })
    };

    return Product.find(query)
      .sort({ _id: -1 })
      .limit(limit || 10);
  },

  searchProducts: async (keyword) => {
    return Product.find(
      { $text: { $search: keyword }, isActive: true },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
  }
};

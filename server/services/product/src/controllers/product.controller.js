import { productService } from "../services/product.service.js";
import { cacheFetch } from "../services/product.cache.js";

export const createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body, req.user.id);
  res.status(201).json(product);
};

export const getProducts = async (req, res) => {
  const key = `products:${JSON.stringify(req.query)}`;

  const products = await cacheFetch(key, () =>
    productService.getProducts(req.query)
  );

  res.json(products);
};

export const searchProducts = async (req, res) => {
  const products = await productService.searchProducts(req.query.q);
  res.json(products);
};

import express from "express";
import {
  createProduct,
  getProducts,
  searchProducts
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/search", searchProducts);

export default router;

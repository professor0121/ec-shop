import express from "express";
import { uploadMedia, removeMedia } from "./media.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadMedia);
router.delete("/:id", removeMedia);

export default router;

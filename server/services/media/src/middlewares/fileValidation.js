import { ALLOWED_MIME_TYPES } from "../constants/mimeTypes.js";

export const validateFile = (type) => (req, res, next) => {
  const file = req.file;
  console.log(file)
  if (!file) return res.status(400).json({ message: "File required" });

  if (!ALLOWED_MIME_TYPES[type].includes(file.mimetype)) {
    return res.status(400).json({ message: "Invalid file type" });
  }
  next();
};

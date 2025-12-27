import Media from "../models/media.model.js";
import { CloudinaryProvider } from "./provider/cloudinary.provider.js";

const provider = new CloudinaryProvider();

export const saveMedia = async (file, meta) => {
  return Media.create({
    originalName: file.originalname,
    type: meta.type,
    mimeType: file.mimetype,
    size: file.size,
    url: file.path,
    secureUrl: file.path,
    publicId: file.filename,
    uploadedBy: meta.userId
  });
};

export const deleteMedia = async (mediaId) => {
  const media = await Media.findById(mediaId);
  await provider.delete(media.publicId);
  await media.deleteOne();
};

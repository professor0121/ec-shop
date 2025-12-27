import cloudinary from "../../config/cloudinary.js";

export class CloudinaryProvider {
  async upload(file, folder) {
    return {
      url: file.path,
      secureUrl: file.path,
      publicId: file.filename
    };
  }

  async delete(publicId) {
    await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
  }
}

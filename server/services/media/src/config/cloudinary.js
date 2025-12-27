import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from './env.js';

try {
    cloudinary.config({
        cloud_name: CLOUDINARY.cloud_name,
        api_key: CLOUDINARY.api_key,
        api_secret: CLOUDINARY.api_secret
    });
    console.log("Cloudinary configured successfully");
} catch (error) {
    console.error("Error configuring Cloudinary:", error);
}

export default cloudinary;
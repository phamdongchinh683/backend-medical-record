const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const cloudinaryConfig = require("../../configs/cloudinary.config");
const { responseStatus } = require("../../global/response");
const {
  _cloudinaryFolder,
  _cloudinaryUploadPreset,
} = require("../../global/secretKey");

cloudinary.config(cloudinaryConfig);

class CloudinaryController {
  async uploadImage(req, res) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: _cloudinaryFolder,
        upload_preset: _cloudinaryUploadPreset,
      });
      fs.unlinkSync(req.file.path);
      responseStatus(res, 200, "success", {
        imageUrl: result.secure_url,
        publicId: result.public_id,
      });
    } catch (error) {
      responseStatus(res, 500, "error", {
        message: "Upload failed",
        details: error.message,
      });
    }
  }
}

module.exports = new CloudinaryController();

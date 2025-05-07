const cloudinary = require("cloudinary");
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
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        resource_type: "auto",
        folder: _cloudinaryFolder,
        upload_preset: _cloudinaryUploadPreset,
        access_mode: "public",
        format: "pdf",
      });
      fs.unlinkSync(req.file.path);
      responseStatus(res, 200, "success", {
        pdf_url: result.secure_url,
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

const dotenv = require("dotenv");
dotenv.config();

const _cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
const _cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const _cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
const _cloudinaryFolder = process.env.CLOUDINARY_FOLDER;
const _cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

const PORT = process.env.PORT;

module.exports = {
  _cloudinaryFolder,
  _cloudinaryUploadPreset,
  _cloudinaryName,
  _cloudinaryApiKey,
  _cloudinaryApiSecret,
  PORT,
};

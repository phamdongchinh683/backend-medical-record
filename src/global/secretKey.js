const dotenv = require("dotenv");
dotenv.config();

const _cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
const _cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const _cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
const _cloudinaryFolder = process.env.CLOUDINARY_FOLDER;
const _cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
const _pinataApiKey = process.env.PINATA_API_KEY;
const _pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;
const _dbUrl = process.env.DB_URL;
const PORT = process.env.PORT;
const _tokenSecret = process.env.TOKEN_SECRET;
const _tokenLife = process.env.TOKEN_LIFE;
const _pinataApiUrl = process.env.PINATA_API_URL;

module.exports = {
  _dbUrl,
  _pinataApiUrl,
  _tokenSecret,
  _tokenLife,
  _pinataApiKey,
  _pinataSecretApiKey,
  _cloudinaryFolder,
  _cloudinaryUploadPreset,
  _cloudinaryName,
  _cloudinaryApiKey,
  _cloudinaryApiSecret,
  PORT,
};

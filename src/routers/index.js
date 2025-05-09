const cloudinaryController = require("../controllers/Cloudinary");
const pinataController = require("../controllers/Pinata");
const uploadPDF = require("../middlewares/upload.middleware");
const validateUserData = require("../middlewares/auth.middleware");
const AuthController = require("../controllers/Auth/");
const uploadSingleFile = require("../global/uploadSingleFile");

function router(app) {
  app.post(
    "/api/v1/upload",
    uploadSingleFile,
    uploadPDF,
    cloudinaryController.uploadImage
  );

  app.post("/api/v1/register", validateUserData, AuthController.register);

  app.get(
    "/api/v1/user/:id",
    validateUserData,
    AuthController.findUserByNationalId
  );

  app.get("/api/v1/doctor", AuthController.getDoctor);

  app.post(
    "/api/v2/upload-to-ipfs",
    uploadSingleFile,
    uploadPDF,
    pinataController.uploadFileToPinata
  );

  app.get("/api/v1/user/:wallet", AuthController.findUserByWallet);
}

module.exports = router;

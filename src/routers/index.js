const multer = require("multer");
const cloudinaryController = require("../controllers/Cloudinary");
const pinataController = require("../controllers/Pinata");
const upload = multer({ dest: "uploads/" });
const uploadPDF = require("../middlewares/upload.middleware");
const validateUserData = require("../middlewares/auth.middleware");
const AuthController = require("../controllers/Auth/");
function router(app) {
  app.post(
    "/api/v1/upload",
    upload.single("file"),
    uploadPDF,
    cloudinaryController.uploadImage
  );

  app.post("/api/v1/register", validateUserData, AuthController.register);

  app.post(
    "/api/v2/upload-to-ipfs",
    upload.single("file"),
    uploadPDF,
    pinataController.uploadFileToPinata
  );
}

module.exports = router;

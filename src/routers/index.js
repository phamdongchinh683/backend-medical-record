const multer = require("multer");
const cloudinaryController = require("../controllers/Cloudinary");
const upload = multer({ dest: "uploads/" });
const uploadPDF = require("../middlewares/upload.middleware");
function router(app) {
  app.post(
    "/api/v1/upload",
    upload.single("file"),
    uploadPDF,
    cloudinaryController.uploadImage
  );

  app.get("/", (req, res) => {
    res.send("Hello API");
  });
}

module.exports = router;

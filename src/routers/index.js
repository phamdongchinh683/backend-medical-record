const multer = require("multer");
const cloudinaryController = require("../controllers/Cloudinary");
const upload = multer({ dest: "uploads/" });

function router(app) {
  app.post(
    "/api/v1/upload",
    upload.single("image"),
    cloudinaryController.uploadImage
  );

  app.get("/", (req, res) => {
    res.send("Hello API");
  });
}

module.exports = router;

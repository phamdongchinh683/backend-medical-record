const express = require("express");
const authController = require("../../controllers/Auth");
const patientMiddleware = require("../../middlewares/patient.middleware");
const uploadSingleFile = require("../../global/uploadSingleFile");
const router = express.Router();
const pinataController = require("../../controllers/Pinata");
const uploadPDF = require("../../middlewares/upload.middleware");
const { authorization } = require("../../middlewares/auth.middleware");
const doctorController = require("../../controllers/Doctor");

router.use(authorization);
router.use(patientMiddleware.isPatient);
router.get("/doctors", doctorController.getDoctor);
router.get("/doctor/:id", doctorController.getDoctorById);
router.post(
  "/upload-to-ipfs",
  uploadSingleFile,
  uploadPDF,
  pinataController.uploadFileToPinata
);

module.exports = router;

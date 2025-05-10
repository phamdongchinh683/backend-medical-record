const express = require("express");
const router = express.Router();
const { authorization } = require("../../middlewares/auth.middleware");
const doctorMiddleware = require("../../middlewares/doctor.middleware");
const patientController = require("../../controllers/Patient");
const authController = require("../../controllers/Auth");

router.use(authorization);
router.use(doctorMiddleware.isDoctor);

router.get("/patients", patientController.getPatient);
router.get(
  "/patient/national-id/:nationalId",
  authController.findUserByNationalId
);
router.get("/patient/:id", patientController.getPatientById);

module.exports = router;

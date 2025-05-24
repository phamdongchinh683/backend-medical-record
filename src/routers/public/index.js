const express = require("express");
const router = express.Router();
const doctorController = require("../../controllers/Doctor");
const patientController = require("../../controllers/Patient");
router.get("/doctors", doctorController.getDoctor);

router.get("/patients", patientController.getPatient);

module.exports = router;

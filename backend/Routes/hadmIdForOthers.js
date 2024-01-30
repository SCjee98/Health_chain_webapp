const express = require("express");
const router = express.Router();
const Admission = require("../schema/admissionSchema");

// Define the hospital abbreviation
const hospitalAbbreviation = "HADM";

router.get("/", async (req, res) => {
  try {
    const patientId = req.query.patientId;

    // Find the highest serial number for the specified patientId
    const latestAdmission = await Admission.findOne({ patientId })
      .sort({ hospitalAdmissionId: -1 })
      .select("hospitalAdmissionId");

    if (latestAdmission && latestAdmission.hospitalAdmissionId) {
      const serialNumber = parseInt(
        latestAdmission.hospitalAdmissionId.split(hospitalAbbreviation)[1]
      );

      if (!isNaN(serialNumber)) {
        const paddedSerialNumber = serialNumber.toString().padStart(4, "0");
        const hospitalAdmissionId = `${hospitalAbbreviation}${paddedSerialNumber}`;
        res.json({ hospitalAdmissionId });
      } else {
        res.status(500).json({ error: "Invalid serial number format" });
      }
    } else {
      res.status(500).json({ error: "No admission records found" });
    }
  } catch (error) {
    console.error("Error generating HADMId:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

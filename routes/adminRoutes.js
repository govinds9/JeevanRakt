const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDonarListcController,
  getHospitalListcController,
  getOrgListcController,
  deleteDonarController,
  deleteHospitalController,
  deleteOrgController,
} = require("../controller/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");

//Router object
const router = express.Router();

//get donar List  router
router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarListcController
);

//get Hospital List  router
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListcController
);

//get Organisation List  router
router.get("/org-list", authMiddleware, adminMiddleware, getOrgListcController);

//============== delete router

// donar delete router
router.delete(
  "/delete-donar/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonarController
);

// Hospital delete router
router.delete(
  "/delete-hospital/:id",
  authMiddleware,
  adminMiddleware,
  deleteHospitalController
);
// Organisation delete router
router.delete(
  "/delete-org/:id",
  authMiddleware,
  adminMiddleware,
  deleteOrgController
);

// Export

module.exports = router;

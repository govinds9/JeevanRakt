const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {
  CreateInventoryController,
  getInventoryController,

  getDonarController,
  getHospitalController,
  getOrganisationController,
  getOrganisationforHospController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controller/inventoryController");

//routes
router.post("/create-inventory", authMiddleware, CreateInventoryController);
//get all blood record
router.get("/get-inventory", authMiddleware, getInventoryController);
//get Recent blood record
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

//get Donar record
router.get("/get-donars", authMiddleware, getDonarController);
//get Hospital  record
router.get("/get-hospitals", authMiddleware, getHospitalController);
//get Organisations  record
router.get("/get-organisations", authMiddleware, getOrganisationController);
//get Organisations  record
router.get(
  "/get-organisations-hospital",
  authMiddleware,
  getOrganisationforHospController
);

//get Hospital blood record
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

module.exports = router;

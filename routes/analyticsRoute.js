const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  bloodGroupDetailController,
} = require("../controller/analyticalController");
const router = express.Router();

router.get("/bloodgroups-data", authMiddleware, bloodGroupDetailController);

module.exports = router;

const express = require("express")
const {test} =require("../controller/testController")

//router object
const router = express.Router();


router.get('/test',test);

module.exports = router;
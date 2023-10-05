const express = require("express");
const {registrationController,loginController, currentUserController}= require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// router for register
router.post('/register',registrationController)
// logIn
router.post('/login',loginController)

// to get current user
router.get('/current-user',authMiddleware,currentUserController)


module.exports = router
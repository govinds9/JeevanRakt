const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrationController = async (req, res) => {
  try {
    const existanceUser = await UserModel.findOne({ email: req.body.email });

    if (existanceUser) {
      return res.status(200).send({
        success: false,
        message: "User Already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    // has password
    req.body.password = hashPassword;
    const user = new UserModel(req.body);
    user.save();
    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch ({ error }) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in Register API",
      error,
    });
  }
};

// lonin callback
const loginController = async (req, res) => {
  try {
    const existanceUser = await UserModel.findOne({ email: req.body.email });
    if (!existanceUser) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    // check role
    if (existanceUser.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "role doesn't match",
      });
    }

    //compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      existanceUser.password
    );
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Wrong password",
      });
    }
    const token = jwt.sign(
      { userId: existanceUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const user = existanceUser;
    return res.status(200).send({
      success: true,
      message: "logIn successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in logIn Api",
      error,
    });
  }
};

// get current user
const currentUserController = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unable to get current User",
      error,
    });
  }
};

module.exports = {
  registrationController,
  loginController,
  currentUserController,
};

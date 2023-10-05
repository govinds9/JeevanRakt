const UserModel = require("../Models/UserModel");

module.exports = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Auth failed",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Auth failed admin Api",
      error,
    });
  }
};

const UserModel = require("../Models/UserModel");

// get donar list

const getDonarListcController = async (req, res) => {
  try {
    const donarData = await UserModel.find({ role: "donar" }).sort({
      CreatedAt: -1,
    });

    return res.status(200).send({
      success: true,
      count: donarData.length,
      message: " Donar List fetch successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in donarlist api",
    }),
      error;
  }
};
// get hospital list

const getHospitalListcController = async (req, res) => {
  try {
    const hospitalData = await UserModel.find({ role: "hospital" }).sort({
      CreatedAt: -1,
    });

    return res.status(200).send({
      success: true,
      count: hospitalData.length,
      message: " Hospital List fetch successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in hospitallist api",
    }),
      error;
  }
};

//get organisation  List
const getOrgListcController = async (req, res) => {
  try {
    const orgData = await UserModel.find({ role: "organisation" }).sort({
      CreatedAt: -1,
    });

    return res.status(200).send({
      success: true,
      count: orgData.length,
      message: " organisation List fetch successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in organisationlist api",
    }),
      error;
  }
};

// ==============================

// delete donar controller
const deleteDonarController = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Donar record deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error while deleting donar",
      error,
    });
  }
};

// delete Hospital  controller
const deleteHospitalController = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Hospital record deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error while deleting Hospital",
      error,
    });
  }
};

// deelete organisation controller
const deleteOrgController = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Organisation record deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error while deleting organisation",
      error,
    });
  }
};

module.exports = {
  getDonarListcController,
  getHospitalListcController,
  getOrgListcController,
  deleteDonarController,
  deleteHospitalController,
  deleteOrgController,
};

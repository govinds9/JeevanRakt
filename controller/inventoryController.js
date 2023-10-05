const UserModel = require("../Models/UserModel");
const Inventorymodel = require("../Models/Inventorymodel");
const mongoose = require("mongoose");

// create inventory
const CreateInventoryController = async (req, res) => {
  try {
    //destructure from req
    const { email } = req.body;
    //validation
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }
    // if(inventoryType==='in' && user.role !=='donar'){
    // throw new Error("not a donar account")

    // }
    // if(inventoryType=== 'out' && user.role !=='hospital'){
    //     throw new Error("not a donar account")

    // }

    if (req.body.inventoryType === "out") {
      const reqBloodGroup = req.body.bloodGroup;
      const reqQuantity = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      // calculating blood quantity
      const totalOfReqBlood = await Inventorymodel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: reqBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalOfReqBlood[0]?.total || 0;

      //    calculate out Blood quantity
      const totalreqOfOut = await Inventorymodel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: reqBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: {
              $sum: "$quantity",
            },
          },
        },
      ]);

      const totalOut = totalreqOfOut[0]?.total || 0;

      //  calculation of in and out
      const availableQuantityofReqGrp = totalIn - totalOut;
      if (availableQuantityofReqGrp < reqQuantity) {
        return res.status(500).send({
          success: false,
          message: `only ${availableQuantityofReqGrp} ML of ${reqBloodGroup}`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    const inventory = new Inventorymodel(req.body);
    await inventory.save();

    return res.status(200).send({
      success: true,
      message: "New Blood record Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Creating inventory Api",
      error,
    });
  }
};

// get all inventory detail

const getInventoryController = async (req, res) => {
  try {
    const inventory = await Inventorymodel.find({
      organisation: req.body.userId,
    })
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get All records Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error in get all inventory",
      error,
    });
  }
};

//  get donar Records
const getDonarController = async (req, res) => {
  try {
    const organisation = req.body.userId;

    const donarId = await Inventorymodel.distinct("donar", {
      organisation,
    });

    const donars = await UserModel.find({ _id: { $in: donarId } });
    return res.status(200).send({
      success: true,
      message: "Donar Record Fetch Successfully",
      donars,
    });
  } catch (error) {
    cosole.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar record",
      error,
    });
  }
};

// get Hospital

const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    console.log(organisation);
    // get Hospital id
    const hospitalId = await Inventorymodel.distinct("hospital", {
      organisation,
    });

    const hospitals = await UserModel.find({ _id: { $in: hospitalId } });

    return res.status(200).send({
      success: true,
      message: "Hospital fetch successfully ",
      hospitals,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in Hospital record",
      error,
    });
  }
};

// get Organisations
const getOrganisationController = async (req, res) => {
  try {
    const donar = req.body.userId;

    const organisationId = await Inventorymodel.distinct("organisation", {
      donar,
    });

    const organisations = await UserModel.find({
      _id: { $in: organisationId },
    });

    return res.status(200).send({
      success: true,
      message: "Oraganisation fetch Succesfully",
      organisations,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in organisation record",
      error,
    });
  }
};

// get organisation for hospital
const getOrganisationforHospController = async (req, res) => {
  try {
    const hospit = req.body.userId;

    const organisationId = await Inventorymodel.distinct("organisation", {
      hospit,
    });

    const organisations = await UserModel.find({
      _id: { $in: organisationId },
    });

    return res.status(200).send({
      success: true,
      message: "Oraganisation fetch Succesfully",
      organisations,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in organisation record",
      error,
    });
  }
};

// get hospital consumer record
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await Inventorymodel.find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "get Hospital records Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error in get all inventory",
      error,
    });
  }
};

const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await Inventorymodel.find({
      organisation: req.body.userId,
    })
      .limit(3)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "data fetch Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get recent inventory Api",
      error,
    });
  }
};
module.exports = {
  CreateInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
  getOrganisationController,
  getOrganisationforHospController,
  getInventoryHospitalController,
  getRecentInventoryController,
};

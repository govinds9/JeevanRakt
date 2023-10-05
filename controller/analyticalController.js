const Inventorymodel = require("../Models/Inventorymodel");
const mongoose = require("mongoose");

const bloodGroupDetailController = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupsData = [];

    const organisation = new mongoose.Types.ObjectId(req.body.userId);

    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        // calculation of total in

        const totalIn = await Inventorymodel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in",
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);

        // calculation of total out
        const totalOut = await Inventorymodel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out",
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);

        // Available
        const availableBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        bloodGroupsData.push({
          bloodGroup: bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableBlood,
        });
      })
    );

    return res.status(200).send({
      success: true,
      message: "Bloodgroup Data fetch Successfully",
      bloodGroupsData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Analytical api",
      error,
    });
  }
};

module.exports = { bloodGroupDetailController };

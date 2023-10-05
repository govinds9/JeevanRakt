const mongoose = require("mongoose");
const colors = require("colors")

const connectDB =async()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log(`connected to the mongoose ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`mongoose Database Error ${error}`.bgRed.white)
    }
}

module.exports ={connectDB}
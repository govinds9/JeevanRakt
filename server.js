const express = require("express");
const dotenv = require("dotenv"); // donenv to use process
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const { connectDB } = require("./config/db"); //database connection

//dot env connected
dotenv.config();

// mongodbconnection
connectDB();

//rest object app has all the functionality of express
const app = express();
// port
const PORT = process.env.PORT || 8080;
// middleware
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

// rounte first route create
app.use("/", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authroute"));
app.use("/api/v1/inventory", require("./routes/Inventoryroutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoute"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// listen
app.listen(PORT, () => {
  console.log("server is running on port : ", PORT);
});

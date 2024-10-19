const express = require("express")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authRoute = require("./routes/auth.routes.js")
const userRoute = require( "./routes/user.routes.js")
const rideRoute = require("./routes/ride.routes.js")

const app = express()
const PORT = 8080;

dotenv.config()

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));
};

//middlewares
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    // allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  }
))
app.use(cookieParser())
app.use(express.json())

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/rides", rideRoute);

app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: err.status,
    error: errorMessage
  })
})

app.listen(PORT, () => {
  // connectDB()
  console.log(`Connected to backend on PORT: ${PORT}`)
})
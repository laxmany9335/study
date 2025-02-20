const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payment');
const profileRoutes = require('./routes/Profile');
const contactRoutes = require('./routes/Contact');

const database = require('./config/database');
const cookieParser = require("cookie-parser");
const cors = require("cors")
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT ||4000;

//database se connect karo
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "https://localhost:3000",
        credentials: true,
    })
)
app.use(
    fileUpload({
         useTempFiles: true,
         tempFileDir: "/tmp"
    })
)

//cloudinary connect 
cloudinaryConnect();

//route mount
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);


//defeault route
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "your server is up running"
    })
})

app.listen(PORT, ()=>{
    console.log(`App is runnng at ${PORT}`)
})

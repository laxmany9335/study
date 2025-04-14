const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payment');
const profileRoutes = require('./routes/Profile');
const contactRoutes = require('./routes/Contact');

const database = require('./config/database');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 4000;

// Connect to the database
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Allow HTTP
      "https://localhost:3000" // Allow HTTPS
    ],
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp", // Ensure this directory exists or change path
  })
);

// Cloudinary connect
cloudinaryConnect();

// Route mounting
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// Default route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Your server is up and running",
  });
});

// Handle 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/userAuthentication");
const multer = require("multer");
const path = require("path");

const {
  userProfileData,
  selfProfileData,
  updateUserProfile,
  peopleYouMayKnow,
} = require("../controllers/user");

// multer for cv upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Specify the folder to store the uploaded files
//     cb(null, "public/uploads/");
//   },
//   filename: function (req, file, cb) {
//     // Set the file name to be unique to avoid conflicts
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// // Initialize multer with the storage configuration
// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     // Only accept PDF files
//     if (file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Only PDF files are allowed!"), false);
//     }
//   },
// });

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize multer with the storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    // Restrict file types (e.g., images and PDFs only)
    if (file.fieldname === "image") {
      // Accept only images
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed!"), false);
      }
    } else if (file.fieldname === "cv") {
      // Accept only PDF for CV
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only PDF files are allowed for CV!"), false);
      }
    }
  },
});

// Middleware to handle multiple file uploads
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "cv", maxCount: 1 },
]);

// routes
router.get("/user/:id", userAuthentication, userProfileData);

router.get("/selfuser", userAuthentication, selfProfileData);

router.patch(
  "/updateuser",
  userAuthentication,
  uploadFields,
  updateUserProfile
);

router.get("/peoplerecommendations", userAuthentication, peopleYouMayKnow);

module.exports = router;

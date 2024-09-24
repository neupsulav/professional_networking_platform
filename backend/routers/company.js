const express = require("express");
const router = express.Router();
const multer = require("multer");

const companyAuthentication = require("../middlewares/companyAuthentication");
const userAuthentication = require("../middlewares/userAuthentication");

// multer for image upload
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads/companyImages");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${Math.floor(Math.random() * 100000)}${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

const {
  getCompanySelfProfileDetails,
  getOtherCompanyProfileDetails,
  updateCompanyProfile,
  getCompanyNotification,
} = require("../controllers/company");

// routes
router.get(
  "/getcompanyselfprofile",
  companyAuthentication,
  getCompanySelfProfileDetails
);

router.get(
  "/getothercompanyprofile/:id",
  userAuthentication,
  getOtherCompanyProfileDetails
);

router.patch(
  "/updateCompanyProfile",
  companyAuthentication,
  uploadOptions.single("image"),
  updateCompanyProfile
);

router.get(
  "/getcompanynotifications/",
  userAuthentication,
  getCompanyNotification
);

module.exports = router;

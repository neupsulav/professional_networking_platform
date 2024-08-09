const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/userAuthentication");

const { followCompany } = require("../controllers/followCompany");

// routes
router.patch("/follow/company/:id", userAuthentication, followCompany);

module.exports = router;

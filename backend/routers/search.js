const express = require("express");
const router = express.Router();

const { searchPeopleAndCompanies } = require("../controllers/search");

router.get("/search", searchPeopleAndCompanies);

module.exports = router;

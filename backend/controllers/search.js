const User = require("../models/user");
const Company = require("../models/company");

const searchPeopleAndCompanies = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Search query cannot be empty" });
    }

    const regex = new RegExp(query, "i");

    const users = await User.find({ name: { $regex: regex } });
    const companies = await Company.find({ name: { $regex: regex } });

    const results = {
      users,
      companies,
    };

    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching people and companies:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { searchPeopleAndCompanies };

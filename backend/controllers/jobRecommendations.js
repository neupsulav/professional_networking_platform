// Required packages
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const Job = require("../models/job");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");

// Utility function to tokenize job content and skills
const tokenize = (text) => {
  return text
    .toLowerCase()
    .split(/[\s,]+/)
    .map((word) => word.trim());
};

// Match the skills with job content (intro, requirements, responsibilities)
const calculateSkillMatch = (userSkills, job) => {
  // Tokenize job fields
  const jobIntroTokens = tokenize(job.intro);
  const jobRequirementsTokens = tokenize(job.requirements);
  const jobResponsibilitiesTokens = tokenize(job.responsibilities);

  // Combine all tokens from job fields
  const allJobTokens = [
    ...jobIntroTokens,
    ...jobRequirementsTokens,
    ...jobResponsibilitiesTokens,
  ];

  // Count matching skills
  let matchCount = 0;
  userSkills.forEach((skill) => {
    if (allJobTokens.includes(skill.toLowerCase())) {
      matchCount++;
    }
  });

  return matchCount;
};

const getJobRecommendations = catchAsync(async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the user's skills
    const userSkills = user.skills || [];
    if (userSkills.length === 0) {
      return res.status(400).json({ message: "User has no skills defined" });
    }

    // Fetch all jobs
    const jobs = await Job.find();

    // Compute the skill match score for each job
    const jobRecommendations = jobs.map((job) => {
      const skillMatchCount = calculateSkillMatch(userSkills, job);
      return {
        jobId: job._id,
        jobTitle: job.title, // Assuming job has a 'title' field
        matchScore: skillMatchCount,
        jobDetails: job, // Add other details if needed
      };
    });

    // Sort jobs by match score in descending order (highest matches first)
    jobRecommendations.sort((a, b) => b.matchScore - a.matchScore);

    // Send the top recommendations and filter out jobs with 0 matches
    res.json(jobRecommendations.filter((job) => job.matchScore > 0));
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = { getJobRecommendations };

const express = require("express");
const Resume = require("../models/Resume");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


module.exports = router;
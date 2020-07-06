var express = require("express");
const { requiresLogin, requiresHost } = require("../services/authenticationServiec");
const { createExperience, getAllExperience, updateExperience, findOneExperience } = require("../controllers/experienceController");

var router = express.Router();

router
	.route("/experiences")
	.get(getAllExperience)
	// .post(requiresLogin, requiresHost, createExperience)
	.post(createExperience);

router
	.route("/experiences/:experienceId")
	// .put(requiresLogin, requiresHost, updateExperience)
	.put(updateExperience)
	.get(findOneExperience);

module.exports = router;

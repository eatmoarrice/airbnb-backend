var express = require('express');
var router = express.Router();

const { requiresLogin, requiresHost } = require("../services/authenticationServiec")
const { createTag, getTag, deleteTag, updateTag } = require("../controllers/tagController");



router.route("/tags")
    .get(getTag)
    .post(requiresLogin, requiresHost, createTag) // create
router.route("/tags/:tagId")
    .put(requiresLogin, requiresHost,updateTag)
    .delete(requiresLogin, requiresHost,deleteTag)


module.exports = router;

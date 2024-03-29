const express = require("express");
const router = express.Router();
const issuesController = require('../controllers/issuesController')
const errorHandler = require('../middleware/errorHandler')
const passport = require("../middleware/authMiddleware");

router.post('/',passport.authenticate("jwt", { session: false }), issuesController.createIssue)

router.use(errorHandler);

module.exports = router;
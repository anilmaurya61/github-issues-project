const express = require("express");
const router = express.Router();
const issuesController = require('../controllers/issuesController')
const errorHandler = require('../middleware/errorHandler')
const passport = require("../middleware/authMiddleware");


router.get('/:issueNumber', passport.authenticate("jwt", { session: false }), issuesController.getIssue)

router.put('/:issueNumber', passport.authenticate("jwt", { session: false }), issuesController.updateIssue)

router.use(errorHandler);


module.exports = router;
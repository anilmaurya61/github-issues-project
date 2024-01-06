const express = require("express");
const router = express.Router();
const issuesController = require('../controllers/issuesController')
const errorHandler = require('../middleware/errorHandler')

router.get('/:issueNumber', issuesController.getIssue)

router.put('/:issueNumber', issuesController.updateIssue)

router.use(errorHandler);

module.exports = router;
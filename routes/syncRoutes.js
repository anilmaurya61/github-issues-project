const express = require("express");
const router = express.Router();
const issuesController = require('../controllers/issuesController')
const errorHandler = require('../middleware/errorHandler')

router.post('/', issuesController.createIssue)

router.use(errorHandler);

module.exports = router;
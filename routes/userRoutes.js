const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController')
const errorHandler = require('../middleware/errorHandler')
const passport = require("../middleware/authMiddleware");



router.post('/register', authController.register)
router.post('/login', passport.authenticate('local', { session: false }), authController.login)

router.use(errorHandler);

module.exports = router;
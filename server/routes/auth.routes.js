const express = require('express');
const { login, logout, register } = require('../controllers/auth');
const { verifyToken } = require('../utils/verifyToken');

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", verifyToken, logout)

module.exports = router;

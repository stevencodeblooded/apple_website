const express = require('express');
const { deleteUser, getAllUsers, getUser, updateUser } = require('../controllers/user');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');
const router = express.Router()

router.get("/", verifyAdmin, getAllUsers)
router.get("/:id", verifyUser, getUser)
router.patch("/:id", verifyUser, updateUser)
router.delete("/:id", verifyUser, deleteUser)

module.exports = router;

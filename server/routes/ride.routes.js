const express = require('express');
const { createRide, getAllRides, getRide, updateRide, deleteRide, findRides, joinRide } = require('../controllers/ride');
const { verifyAdmin, verifyToken, verifyUser } = require('../utils/verifyToken');

const router = express.Router()

router.get("/", verifyAdmin, getAllRides)
router.post("/", verifyToken, createRide)
router.get("/find", findRides)

router.get("/:id", getRide)
router.get("/:id/join", verifyToken, joinRide)
router.patch("/:id", verifyUser, updateRide)
router.delete("/:id", verifyToken, deleteRide)

module.exports = router;

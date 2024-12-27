const express = require('express');
const router = express.Router();
const { AddPlayer, GetAllPlayers } = require("../services/userService");

router.post("/", AddPlayer);
router.get("/", GetAllPlayers)

module.exports = router;
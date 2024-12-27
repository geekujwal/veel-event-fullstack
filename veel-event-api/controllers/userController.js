const express = require('express');
const { SeedUsers, Login, GetAllPlayers, ListUsersByPoints, SeedPlayers, GetMyInfo } = require("../services/userService");
const router = express.Router();

router.get("/player", GetAllPlayers)
router.get("/me", GetMyInfo)
router.get("/fantasy", ListUsersByPoints)
router.post("/login", Login);
router.post("/seedUser", SeedUsers);
router.post("/seedPlayer", SeedPlayers);

module.exports = router;
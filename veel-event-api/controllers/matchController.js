const express = require('express');
const router = express.Router();
const { CreateLowerBracketMatch, VoteFavoriteMatch, CurrentMatch, MatchesSortedByVotes, UpdateCurrentlyRunningGame, VoteForPlayerInFantasy, UpdateMatch, SeedMatch, GetMatches, GetUnDecidedMatches,
    GetMatch
 } = require("../services/matchService");

router.post("/", CreateLowerBracketMatch);
router.get("/", GetMatches);
router.get("/undecided", GetUnDecidedMatches);
router.get("/current", CurrentMatch);
router.post("/seedMatch", SeedMatch);
// router.post("/seedMatch/lower", CreateLowerBracketBlueprint);
router.post("/:matchId", VoteFavoriteMatch);
router.get("/:matchId", GetMatch);
router.put("/currentGame/:matchId", UpdateCurrentlyRunningGame);
router.put("/", UpdateMatch);
router.put("/vote/:matchId/:playerVotedFor", VoteForPlayerInFantasy);
router.get("/sort/vote", MatchesSortedByVotes);

module.exports = router;
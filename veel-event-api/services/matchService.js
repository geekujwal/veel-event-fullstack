const { MatchDocument } = require("../documents/matchDocument");
const { UserDocument } = require("../documents/userDocument");
const { PlayerDocument } = require('../documents/playerDocument');
const uuidv4 = require('uuid').v4;

exports.CreateLowerBracketMatch = async (req, res) => {
    const { playerA, playerB, round, parent } = req.body;
    try {
        const existingMatch = await MatchDocument.findOne({
            playerB: null,
            round,
            bracket: "lower"
        });

        if (existingMatch) {
            const playerBDocument = await PlayerDocument.findOne({ id: playerB });
            existingMatch.playerB = {
                id: playerBDocument.id,
                name: playerBDocument.name,
            };
            existingMatch.parentB = parent;
            await existingMatch.save();
            return res.status(200).json(existingMatch);
        } else {
            const players = await PlayerDocument.find({ id: { $in: [playerA, playerB] } });
            const playerADocument = players.find(player => player.id === playerA);
            const playerBDocument = players.find(player => player.id === playerB);
            const match = new MatchDocument({
                id: uuidv4(),
                playerA: {
                    id: playerADocument.id,
                    name: playerADocument.name,
                },
                playerB: {
                    id: playerBDocument.id,
                    name: playerBDocument.name,
                },
                bracket: "lower",
                round,
                isCurrentGame: false,
                isGameOver: false,
                votes: [],
                fantasy: [],
                parentA: parent
            });
            await match.save();
            return res.status(200).json(match);
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('server side exception');
    }
}

exports.CurrentMatch = async (req, res) => {
    try {
        var match = await MatchDocument.findOne({
            isCurrentGame: true
        })
        return res.status(200).json(match)

    } catch (err) {
        console.log(err)
        res.status(500).send('server side exception');
    }
}

exports.GetMatch = async (req, res) => {
    const { matchId } = req.params;
    try {
        var match = await MatchDocument.findOne({
            id: matchId
        })
        if (!match) {
            return res.status(404).json({
                msg: "Match not found"
            })
        }
        return res.status(200).json(match)

    } catch (err) {
        console.log(err)
        res.status(500).send('server side exception');
    }
}

exports.VoteFavoriteMatch = async (req, res) => {
    const { code } = req.query
    const { matchId } = req.params
    console.log("working...")
    try {
        var user = await UserDocument.findOne({
            code: code
        })
        if (user == null) {
            return res.status(404).json({
                msg: "User not found"
            })
        }
        if (user.votes > 3) {
            return res.status(400).json({
                msg: "You have completed your voted limit i.e. 3"
            })
        }
        user.votes += 1;
        const match = await MatchDocument.findOne({
            id: matchId
        });
        if (!match) {
            return res.status(404).json({
                msg: "Match not found"
            });
        }
        if (match.votes.includes(user.id)) {
            return res.status(400).json({
                msg: "You have already voted for this match"
            })
        }

        match.votes.push(user.id);
        await user.save();
        await match.save();
        res.status(200).json({
            msg: "Vote registered successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('server side exception');
    }
}

exports.MatchesSortedByVotes = async (req, res) => {
    try {
        const matches = await MatchDocument.aggregate([
            {
                $match: { isGameOver: true }
            },
            {
                $addFields: {
                    voteCount: { $size: { $ifNull: ["$votes", []] } }
                }
            },
            {
                $sort: { voteCount: -1 }
            }
        ]);

        res.status(200).json(matches);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server side exception" });
    }
};

exports.UpdateCurrentlyRunningGame = async (req, res) => {
    try {
        const { matchId } = req.params;
        const match = await MatchDocument.findOne({ id: matchId });

        if (!match) {
            return res.status(404).json({ msg: "Match not found" });
        }
        await MatchDocument.updateMany({ isCurrentGame: true }, { $set: { isCurrentGame: false } });
        match.isCurrentGame = true;
        await match.save();
        return res.status(200).json(match);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server side exception" });
    }
}

exports.VoteForPlayerInFantasy = async (req, res) => {
    const { code } = req.query;
    const { matchId, playerVotedFor } = req.params;
    try {
        const match = await MatchDocument.findOne({ id: matchId });
        if (!match) {
            res.status(400).json({
                msg: 'Match not found'
            })
        }
        if (match.isGameOver || match.isCurrentGame) {
            res.status(400).json({
                msg: 'Cannot vote, when match is already started or over'
            })
        }

        const user = await UserDocument.findOne({
            code
        });
        const existingVote = user.fantasy.find(vote => vote.matchId === matchId);
        if (existingVote) {
            res.status(400).json({
                msg: 'You have already voted for this match'
            })
        }

        user.fantasy.push({ matchId, playerVotedFor });
        match.fantasy.push(user.id)
        await user.save();
        await match.save();

        res.status(200).json({ success: true, message: 'Vote registered successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server side exception" });
    }
}

exports.UpdateMatch = async (req, res) => {
    const { playerAScore, playerBScore, isDeuce, isGameOver, isAdvantage, winner } = req.body;
    try {
        const match = await MatchDocument.findOne({
            isCurrentGame: true
        })
        if (!match) {
            return res.status(404).json({ msg: "Not match is running right now" });
        }
        match.playerAScore = playerAScore
        match.playerBScore = playerBScore
        match.isDeuce = isDeuce ?? match.isDeuce
        match.isAdvantage = isAdvantage ?? match.isAdvantage
        match.isGameOver = isGameOver ?? match.isGameOver
        match.isCurrentGame = isGameOver !== null && !isGameOver
        match.winner = winner ?? null

        await match.save()
        if (isGameOver) {
            const users = await UserDocument.find({ fantasy: { $elemMatch: { matchId: match.id } } })
            console.log(`Total users who voted for match ${match.id} are ${users.length}`);

            for (const user of users) {
                const vote = user.fantasy.find(vote => vote.matchId === match.id);
                if (vote && vote.playerVotedFor === match.winner) {
                    user.points += 1;
                    await user.save();
                    console.log(`User ${user.name} points updated`);
                }
            }

            const nextMatch = await MatchDocument.findOne({
                round: match.round + 1,
                $or: [{ parentA: match.id }, { parentB: match.id }]
            });

            if (nextMatch !== null) {
                if (nextMatch.parentA === match.id) {
                    nextMatch.playerA = { id: match.winner, name: match.winner === match.playerA.id ? match.playerA.name : match.playerB.name };
                    nextMatch.parentA = match.id;
                    await nextMatch.save();
                } else if (nextMatch.parentB === match.id) {
                    nextMatch.playerB = { id: match.winner, name: match.winner === match.playerA.id ? match.playerA.name : match.playerB.name };
                    nextMatch.parentB = match.id;
                    await nextMatch.save();
                }
            }
        }

        let io = req.app.get('io')
        io.emit('matchUpdated', {
            matchId: match.id,
            playerAScore: playerAScore,
            playerBScore: playerBScore,
            playerA: match.playerA,
            playerB: match.playerB,
            isdeuce: isDeuce ?? match.isDeuce,
            isAdvantage: isAdvantage ?? match.isAdvantage,
            isGameOver: isGameOver ?? match.isGameOver,
            winner: winner ?? null
        });
        return res.status(200).json(match);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server side exception" });
    }
}

exports.GetUnDecidedMatches = async (req, res) => {
    try {
        const matches = await MatchDocument.find({ isGameOver: false });
        return res.status(200).json(matches);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server side exception" });
    }
}

exports.SeedMatch = async (req, res) => {
    try {
        let players = await PlayerDocument.find().sort({ rating: -1 });
        let matches = [];
        let round = 1;

        const createMatch = (playerA, playerB, round, bracket, parentA = null, parentB = null) => {
            return new MatchDocument({
                id: uuidv4(),
                playerA: playerA ? { id: playerA.id, name: playerA.name } : null,
                playerB: playerB ? { id: playerB.id, name: playerB.name } : null,
                is_current_game: false,
                is_game_over: false,
                votes: [],
                fantasy: [],
                round,
                bracket,
                parentA,
                parentB,
            });
        };

        for (let i = 0; i < players.length; i += 2) {
            if (players[i + 1]) {
                const match = createMatch(players[i], players[i + 1], round, 'upper');
                await match.save();
                matches.push(match);
            }
        }

        if (players.length % 2 !== 0) {
            const match = createMatch(players[players.length - 1], null, round, 'upper');
            await match.save();
            matches.push(match);
        }

        let upperMatches = matches.filter((m) => m.bracket === 'upper');
        let lowerMatches = [];
        while (upperMatches.length > 1 || lowerMatches.length > 0) {
            round++;
            let nextUpperMatches = [];
            let nextLowerMatches = [];

            for (let i = 0; i < upperMatches.length; i += 2) {
                if (upperMatches[i + 1]) {
                    const match = createMatch(
                        null,
                        null,
                        round,
                        'upper',
                        upperMatches[i].id,
                        upperMatches[i + 1].id
                    );
                    await match.save();
                    nextUpperMatches.push(match);
                    matches.push(match);
                }
            }

            // Handle odd match in upper bracket
            if (upperMatches.length % 2 !== 0) {
                const match = createMatch(
                    null,
                    null,
                    round,
                    'upper',
                    upperMatches[upperMatches.length - 1].id,
                    null
                );
                await match.save();
                nextUpperMatches.push(match);
                matches.push(match);
            }

            for (let i = 0; i < lowerMatches.length; i += 2) {
                if (lowerMatches[i + 1]) {
                    const match = createMatch(
                        null,
                        null,
                        round,
                        'lower',
                        lowerMatches[i].id,
                        lowerMatches[i + 1].id
                    );
                    await match.save();
                    nextLowerMatches.push(match);
                    matches.push(match);
                }
            }

            if (lowerMatches.length % 2 !== 0) {
                const match = createMatch(
                    null,
                    null,
                    round,
                    'lower',
                    lowerMatches[lowerMatches.length - 1].id,
                    null
                );
                await match.save();
                nextLowerMatches.push(match);
                matches.push(match);
            }

            lowerMatches = [...lowerMatches, ...upperMatches];
            upperMatches = nextUpperMatches;
            lowerMatches = nextLowerMatches;
        }

        return res.status(200).json(matches);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server-side exception" });
    }
};

exports.GetMatches = async (req, res) => {
    try {
        const matches = await MatchDocument.find({}).lean();

        const response = {
            brackets: {
                upper: [],
                lower: [],
            },
            finals: null,
        };


        const addMatchToBracket = (match) => {
            const bracket = match.bracket;
            const round = match.round;

            let roundGroup = response.brackets[bracket].find((r) => r.round === round);
            if (!roundGroup) {
                roundGroup = { round, matches: [] };
                response.brackets[bracket].push(roundGroup);
            }

            roundGroup.matches.push({
                id: match.id,
                playerA: {
                    id: match.playerA?.id,
                    name: match.playerA?.name,
                    score: match.playerAScore,
                },
                playerB: {
                    id: match.playerB?.id,
                    name: match.playerB?.name,
                    score: match.playerBScore,
                },
                winner_id: match.winner,
                is_game_over: match.isGameOver,
                next_match_id: match.parentId,
            });
        };

        matches.forEach((match) => {
            addMatchToBracket(match);
        });

        ['upper', 'lower'].forEach((bracket) => {
            response.brackets[bracket].sort((a, b) => a.round - b.round);
        });

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching matches:", error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}
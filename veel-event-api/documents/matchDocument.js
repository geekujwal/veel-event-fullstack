const mongoose = require("mongoose");

const MatchDocument = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    round: { type: Number, required: true },
    bracket: { type: String, enum: ['upper', 'lower'], required: true },
    playerA: { type: Object, required: false },
    playerB: { type: Object, required: false },
    winner: { type: String, default: null },
    isGameOver: { type: Boolean, default: false },
    isCurrentGame: { type: Boolean, default: false },
    parentA: { type: String, default: null},
    parentB: { type: String, default: null},
    playerAScore: { type: Number, default: 0 },
    playerBScore: { type: Number, default: 0 },
    votes: [{ type: String }],
    fantasy: [{ type: String}],
    isDeuce: { type: Boolean, default: false },
    isAdvantage: { type: Boolean, default: false }
});

exports.MatchDocument = mongoose.model('matchDocument', MatchDocument);

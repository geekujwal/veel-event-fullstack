const mongoose = require("mongoose");

const UserDocument = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, default: null },
    code: { type: String, unique: true },
    votes: { type: Number, default: 0 },
    fantasy: [{
        matchId: { type: String },
        playerVotedFor: { type: String }
    }],
    points: { type: Number, default: 0 },
})

exports.UserDocument = mongoose.model('userDocument', UserDocument)
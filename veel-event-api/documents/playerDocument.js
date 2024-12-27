const mongoose = require("mongoose");

const PlayerDocument = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, default: null },
    rating : { type: Number, default: 0 },
})

exports.PlayerDocument = mongoose.model('playerDocument', PlayerDocument)
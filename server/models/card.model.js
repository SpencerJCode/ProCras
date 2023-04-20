const mongoose = require('mongoose');
const CardSchema = new mongoose.Schema(
{
    deckID: {
        type: String,
    },
    cardFront: {
        type: String,
        required: [true, "Cards must have front material"],
        maxLength: [30, "Card fronts have a max of 30 characters"]
    },
    cardBack: {
        type: String,
        required: [true, "Cards must have back material"],
        maxLength: [30, "Card backs have a max of 30 characters"]
    },
    appearances: {
        type: Number,
    },
    successes: {
        type: Number
    }
}, { timestamps: true });
const Card = mongoose.model('Card', CardSchema);
module.exports= Card
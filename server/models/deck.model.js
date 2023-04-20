const mongoose = require('mongoose');
const DeckSchema = new mongoose.Schema(
{
    stackID: {
        type: String,
    },
    deckName: {
        type: String,
        required: [true, "Please provide a name for this deck"],
        maxLength: [25, "Stack names have a max of 25 characters"]
    },
    cards: {
        type: Array
    }
}, { timestamps: true });
const Deck = mongoose.model('Deck', DeckSchema);
module.exports= Deck
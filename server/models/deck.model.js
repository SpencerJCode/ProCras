import mongoose from "mongoose";
const DeckSchema = new mongoose.Schema(
  {
    stack: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Stack",
    },
    deckName: {
      type: String,
      required: [true, "Please provide a name for this deck"],
      maxLength: [25, "Stack names have a max of 25 characters"],
    },
    cards: [{type: mongoose.SchemaTypes.ObjectId, ref: "Card"}]
  },
  { timestamps: true }
);
const Deck = mongoose.model("Deck", DeckSchema);
export default Deck;

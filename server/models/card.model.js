import mongoose from "mongoose";
const CardSchema = new mongoose.Schema(
  {
    deck: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Deck",
    },
    cardFront: {
      type: String,
      required: [true, "Cards must have front material"],
      maxLength: [30, "Card fronts have a max of 30 characters"],
    },
    cardBack: {
      type: String,
      required: [true, "Cards must have back material"],
      maxLength: [30, "Card backs have a max of 30 characters"],
    },
    appearances: {
      type: Number,
    },
    successes: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Card = mongoose.model("Card", CardSchema);

export default Card;

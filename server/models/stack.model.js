import mongoose from "mongoose";
const StackSchema = new mongoose.Schema(
  {
    stackName: {
      type: String,
      required: [true, "Please name your stack"],
      maxLength: [25, "Stack names have a max of 25 characters"],
    },
    studySession: {
      type: Boolean
    },
    decks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deck" }],
  },
  { timestamps: true }
);
const Stack = mongoose.model("Stack", StackSchema);
export default Stack;

const mongoose = require('mongoose');
const StackSchema = new mongoose.Schema(
{
    stackName: {
        type: String,
        required: [true, "Please name your stack"],
        maxLength: [25, "Stack names have a max of 25 characters"]
    },
    decks: {
        type: Array
    }
}, { timestamps: true });
const Stack = mongoose.model('Stack', StackSchema);
module.exports= Stack
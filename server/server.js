import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/mongoose.config.js";
import deckRouter from "./routes/deck.routes.js";
import cardRouter from "./routes/card.routes.js";

const app = express();
dotenv.config();

app.use(express.json(), cors());
app.use("/api/decks", deckRouter);
app.use("/api/cards", cardRouter);

async function startServer() {
  try {
    const port = process.env.PORT;
    await dbConnect();
    app.listen(port, () => console.log(`Listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
}

startServer();

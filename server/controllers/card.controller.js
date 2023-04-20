import Card from "../models/card.model.js";
import Deck from "../models/deck.model.js";

async function createCard(request, response) {
  try {
    const { deckId } = request.body; // whatever it is called in the form, is how it is called here
    const deck = await Deck.findById(deckId);
    const card = await Card.create(request.body);
    deck.cards.push(card);
    await deck.save();
    response.status(201).json(card);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}

//in form, send deckId, located inside of request.body

async function getOneCard(request, response) {
  try {
    const card = await Card.findById(request.params.id).populate("deck");
    response.status(200).json(card);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}

export { createCard, getOneCard };

import Deck from "../models/deck.model.js";

//create and get one

async function createDeck(request, response) {
  try {
    const deck = await Deck.create(request.body);
    response.status(201).json(deck);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}

async function getOneDeck(request, response) {
  try {
    const deck = await Deck.findById(request.params.id).populate("cards");
    response.status(200).json(deck);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}

export { createDeck, getOneDeck };

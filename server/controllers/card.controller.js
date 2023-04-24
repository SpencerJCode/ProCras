import Card from "../models/card.model.js";
import Deck from "../models/deck.model.js";

//Create Card. In form, send deckId, located inside of request.body
async function createCard(request, response) {
  try {
    const { deck } = request.body; // whatever it is called in the form, is how it is called here
    const foundDeck = await Deck.findById(deck);
    const card = await Card.create(request.body);
    foundDeck.cards.push(card);
    await foundDeck.save();
    response.status(201).json(card);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}
//Gets a single card.
async function getOneCard(request, response) {
  try {
    const card = await Card.findById(request.params.id).populate('deck');
    response.status(200).json(card);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}

//Gets all cards in a deck
async function getAllDeckCards(request, response) {
  try {
    const cards = await Card.find(request.params.deck).populate('deck');
    response.status(200).json(cards);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}
//Updates a card.
async function updateCard(request, response) {
  try {
    const card = await Card.findOneAndUpdate(request.params.id);
    response.status(200).json(card);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}

//Deletes a card.
async function deleteCard(request, response) {
  try {
    const card = await Card.deleteOne({_id: request.params.id});
    response.status(200).json(card);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}

//Deletes all cards in a deck.
async function deleteManyByDeck(request, response) {
  try {
    const cards = await Card.deleteMany(request.params.deck);
    response.status(200).json(cards);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}

export { createCard, getOneCard, updateCard, deleteCard, getAllDeckCards, deleteManyByDeck };

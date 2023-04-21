import Card from "..models/card.model.js";
import Deck from "../models/deck.model.js";
import "..controllers/card.controller.js";

//Creates a new deck
async function createDeck(request, response) {
  try {
    const deck = await Deck.create(request.body);
    response.status(201).json(deck);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}
//Gets a single deck
async function getOneDeck(request, response) {
  try {
    const deck = await Deck.findById(request.params.id).populate("cards");
    response.status(200).json(deck);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}
//Gets all decks in a stack
async function getAllStackDecks(request, response) {
  try {
    const decks = await Deck.find(request.params.stack)
    response.status(200).json(decks);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}

//Updates a single deck
async function updateDeck(request, response) {
  try {
    const deck = await Deck.findOneAndUpdate(request.params.id);
    response.status(200).json(deck);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}
//Deletes a deck.
async function deleteDeck(request, response) {
  try {
    const deck = await Deck.deleteOne(request.params.id);
    const cards = await Card.deleteManyByDeck(request.params.deck)
    response.status(200).json(deck);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}

//Deletes all decks in a stack.
async function deleteManyByStack(request, response) {
  try {
    const decks = await Deck.deleteMany(request.body);
    response.status(200).json(decks);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}

export { createDeck, getOneDeck, updateDeck, deleteDeck, getAllStackDecks, deleteManyByStack };

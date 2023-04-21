import Card from "../models/card.model.js";
import Deck from "../models/deck.model.js";
import Stack from "../models/stack.model.js"
import "../controllers/deck.controller.js"
import "../controllers/card.controller.js"

//Creates a new stack
async function createStack(request, response) {
  try {
    const stack = await Stack.create(request.body);
    response.status(201).json(stack);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}

//Gets a single stack
async function getOneStack(request, response) {
    try {
      const stack = await Stack.findById(request.params.id).populate("decks");
      response.status(200).json(stack);
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  }

  async function getAllStacks(request, response) {
    try {
      const stacks = await Stack.find()
      response.status(200).json(stacks);
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  }

  //Updates a single stack
async function updateStack(request, response) {
    try {
      const stack = await Stack.findOneAndUpdate(request.params.id);
      response.status(200).json(stack);
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  }

  //Deletes a stack
async function deleteStack(request, response) {
    try {
      const stack = await Stack.deleteOne(request.params.id);
      const decks = await Deck.deleteManyByStack(request.params.stack)
      const cards = await Card.deleteManyByDeck(request.params.deck)
      response.status(200).json(stack);
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  }

  export { createStack, getOneStack, updateStack, deleteStack, getAllStacks };
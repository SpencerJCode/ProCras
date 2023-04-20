import { Router } from "express";
import { createDeck, getOneDeck } from "../controllers/deck.controller.js";

const router = Router();

router.route("/").post(createDeck);
router.route("/:id").get(getOneDeck);

export default router;

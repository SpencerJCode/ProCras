import { Router } from "express";
import { 
    createDeck, 
    getOneDeck, 
    updateDeck, 
    deleteDeck, 
    getAllStackDecks,
    getAllDecks,
    deleteManyByStack 
} from "../controllers/deck.controller.js";

const router = Router();

router.route("/stack/:stack").get(getAllStackDecks)
router.route("/").post(createDeck);
router.route("/:id").get(getOneDeck);
router.route("/:id").put(updateDeck);
router.route("/:id").delete(deleteDeck);
router.route("/").get(getAllDecks)

export default router;

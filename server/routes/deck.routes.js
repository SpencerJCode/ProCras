import { Router } from "express";
import { 
    createDeck, 
    getOneDeck, 
    updateDeck, 
    deleteDeck, 
    getAllStackDecks,
    deleteManyByStack 
} from "../controllers/deck.controller.js";

const router = Router();

router.route("/").post(createDeck);
router.route("/:id").get(getOneDeck);
router.route("/:id").put(updateDeck);
router.route("/:id").delete(deleteDeck);
router.route("/:stack").get(getAllStackDecks)

export default router;

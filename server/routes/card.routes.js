import { Router } from "express";
import { 
    createCard, 
    getOneCard, 
    updateCard, 
    deleteCard, 
    getAllDeckCards 
} from "../controllers/card.controller.js";

const router = Router();

router.route("/").post(createCard);
router.route("/:id").get(getOneCard);
router.route("/:id").put(updateCard);
router.route("/:id").delete(deleteCard);
router.route("/:deck").get(getAllDeckCards)

export default router;
import { Router } from "express";
import { createCard, getOneCard } from "../controllers/card.controller.js";

const router = Router();

router.route("/").post(createCard);
router.route("/:id").get(getOneCard);

export default router;
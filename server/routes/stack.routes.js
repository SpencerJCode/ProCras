import { Router } from "express";
import { 
    createStack, 
    getOneStack, 
    updateStack, 
    deleteStack, 
    getAllStacks
} from "../controllers/stack.controller.js";

const router = Router();

router.route("/").get(getAllStacks)
router.route("/").post(createStack);
router.route("/:id").get(getOneStack);
router.route("/:id").put(updateStack);
router.route("/:id").delete(deleteStack);


export default router;
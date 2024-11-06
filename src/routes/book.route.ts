import { BookController } from "../controllers/book.controller";
import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth";

router.get("/", auth, BookController.getAll);
router.post("/", auth, BookController.create);

router.get("/:id", auth, BookController.getById);
router.patch("/:id", auth, BookController.update);
router.delete("/:id", auth, BookController.delete);

export default router;

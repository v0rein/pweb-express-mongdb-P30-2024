import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth";
import { MechanismController } from "../controllers/mechanism.controller";

router.post("/borrow/:id", auth, MechanismController.borrow);
router.post("/return/:id", auth, MechanismController.returnBook);

export default router;

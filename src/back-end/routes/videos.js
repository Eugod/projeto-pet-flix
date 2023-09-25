/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Router } from "express";
import { buscarTodosVideos, buscarVideoAtual } from "../controllers/videos.js"
const router = Router();

router.get("/", buscarTodosVideos);
router.get("/:id", buscarVideoAtual);

export default router;
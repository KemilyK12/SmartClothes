import express from "express";
import * as ItemCarrinhoController from "../Controllers/itemCarrinhoController.js";

const router = express.Router();

router.get("/", ItemCarrinhoController.listar);
router.get("/:id", ItemCarrinhoController.buscarPorId);
router.post("/", ItemCarrinhoController.criar);
router.put("/:id", ItemCarrinhoController.atualizar);
router.delete("/:id", ItemCarrinhoController.excluir);

export default router;
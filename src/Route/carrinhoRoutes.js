import express from "express";
import * as CarrinhoController from "../Controllers/carrinhoController.js";

const router = express.Router();

router.get("/", CarrinhoController.listar);
router.get("/:id", CarrinhoController.buscarPorId);
router.post("/", CarrinhoController.criar);
router.put("/:id", CarrinhoController.atualizar);
router.delete("/:id", CarrinhoController.excluir);

export default router;
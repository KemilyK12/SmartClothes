import express from "express";
import * as ProdutoController from "../Controllers/produtoController.js";

const router = express.Router();

router.get("/", ProdutoController.listar);
router.get("/:id", ProdutoController.buscarPorId);
router.post("/", ProdutoController.criar);
router.put("/:id", ProdutoController.atualizar);
router.delete("/:id", ProdutoController.excluir);

export default router;
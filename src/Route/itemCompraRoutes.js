import express from "express";
import * as ItemCompraController from "../Controllers/itemCompraController.js";

const router = express.Router();

router.get("/", ItemCompraController.listar);
router.get("/:id", ItemCompraController.buscarPorId);
router.post("/", ItemCompraController.criar);
router.put("/:id", ItemCompraController.atualizar);
router.delete("/:id", ItemCompraController.excluir);

export default router;
import express from "express";
import * as CompraVendaController from "../Controllers/compraVendaController.js";

const router = express.Router();

router.get("/", CompraVendaController.listar);
router.get("/:id", CompraVendaController.buscarPorId);
router.post("/", CompraVendaController.criar);
router.put("/:id", CompraVendaController.atualizar);
router.delete("/:id", CompraVendaController.excluir);

export default router;
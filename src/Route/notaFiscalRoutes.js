import express from "express";
import * as NotaFiscalController from "../Controllers/notaFiscalController.js";

const router = express.Router();

router.get("/", NotaFiscalController.listar);
router.get("/:id", NotaFiscalController.buscarPorId);
router.post("/", NotaFiscalController.criar);
router.put("/:id", NotaFiscalController.atualizar);
router.delete("/:id", NotaFiscalController.excluir);

export default router;
import express from "express";
import * as ClienteController from "../Controllers/clienteController.js";

const router = express.Router();

router.get("/", ClienteController.listar);
router.get("/:id", ClienteController.buscarPorId);
router.post("/", ClienteController.criar);
router.put("/:id", ClienteController.atualizar);
router.delete("/:id", ClienteController.excluir);

export default router;
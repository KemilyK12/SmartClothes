
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import clienteRoutes from "./Route/clienteRoutes.js";
import produtoRoutes from "./Route/produtoRoutes.js";
import carrinhoRoutes from "./Route/carrinhoRoutes.js";
import itemCarrinhoRoutes from "./Route/itemCarrinhoRoutes.js";
import compraVendaRoutes from "./Route/compraVendaRoutes.js";
import itemCompraRoutes from "./Route/itemCompraRoutes.js";
import notaFiscalRoutes from "./Route/notaFiscalRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/carrinhos", carrinhoRoutes);
app.use("/itens-carrinho", itemCarrinhoRoutes);
app.use("/compras", compraVendaRoutes);
app.use("/itens-compra", itemCompraRoutes);
app.use("/notas-fiscais", notaFiscalRoutes);

export default app;

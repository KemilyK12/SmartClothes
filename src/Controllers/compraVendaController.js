import * as CompraVendaModel from "../Models/compraVendaModel.js";

export function listar(req, res) {
    CompraVendaModel.listar((err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao listar compras", detalhes: err.message });
        }
        res.json(resultados);
    });
}

export function buscarPorId(req, res) {
    const { id } = req.params;
    CompraVendaModel.buscarPorId(id, (err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar compra", detalhes: err.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ erro: "Compra não encontrada" });
        }
        res.json(resultados[0]);
    });
}

export function criar(req, res) {
    const dados = req.body;
    CompraVendaModel.criar(dados, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao registrar compra", detalhes: err.message });
        }
        res.status(201).json({ id_compra: resultado.insertId, ...dados });
    });
}

export function atualizar(req, res) {
    const { id } = req.params;
    const dados = req.body;
    CompraVendaModel.atualizar(id, dados, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao atualizar compra", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Compra não encontrada" });
        }
        res.json({ mensagem: "Compra atualizada com sucesso" });
    });
}

export function excluir(req, res) {
    const { id } = req.params;
    CompraVendaModel.excluir(id, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao excluir compra", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Compra não encontrada" });
        }
        res.json({ mensagem: "Compra excluída com sucesso" });
    });
}
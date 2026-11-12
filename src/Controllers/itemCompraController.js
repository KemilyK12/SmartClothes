import * as ItemCompraModel from "../Models/itemCompraModel.js";

export function listar(req, res) {
    ItemCompraModel.listar((err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao listar itens da compra", detalhes: err.message });
        }
        res.json(resultados);
    });
}

export function buscarPorId(req, res) {
    const { id } = req.params;
    ItemCompraModel.buscarPorId(id, (err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar item da compra", detalhes: err.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ erro: "Item da compra não encontrado" });
        }
        res.json(resultados[0]);
    });
}

export function criar(req, res) {
    const dados = req.body;
    if (!dados.quantidade || dados.quantidade <= 0) {
        return res.status(400).json({ erro: "A quantidade deve ser maior que zero" });
    }
    ItemCompraModel.criar(dados, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao adicionar item à compra", detalhes: err.message });
        }
        res.status(201).json({ id_item_compra: resultado.insertId, ...dados });
    });
}

export function atualizar(req, res) {
    const { id } = req.params;
    const dados = req.body;
    if (!dados.quantidade || dados.quantidade <= 0) {
        return res.status(400).json({ erro: "A quantidade deve ser maior que zero" });
    }
    ItemCompraModel.atualizar(id, dados, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao atualizar item da compra", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Item da compra não encontrado" });
        }
        res.json({ mensagem: "Item da compra atualizado com sucesso" });
    });
}

export function excluir(req, res) {
    const { id } = req.params;
    ItemCompraModel.excluir(id, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao excluir item da compra", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Item da compra não encontrado" });
        }
        res.json({ mensagem: "Item da compra excluído com sucesso" });
    });
}
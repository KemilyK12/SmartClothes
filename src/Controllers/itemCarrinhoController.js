import * as ItemCarrinhoModel from "../Models/itemCarrinhoModel.js";

export function listar(req, res) {
    ItemCarrinhoModel.listar((err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao listar itens do carrinho", detalhes: err.message });
        }
        res.json(resultados);
    });
}

export function buscarPorId(req, res) {
    const { id } = req.params;
    ItemCarrinhoModel.buscarPorId(id, (err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar item do carrinho", detalhes: err.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ erro: "Item do carrinho não encontrado" });
        }
        res.json(resultados[0]);
    });
}

export function criar(req, res) {
    const dados = req.body;
    if (!dados.quantidade || dados.quantidade <= 0) {
        return res.status(400).json({ erro: "A quantidade deve ser maior que zero" });
    }
    ItemCarrinhoModel.criar(dados, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao adicionar item ao carrinho", detalhes: err.message });
        }
        res.status(201).json({ id_item_carrinho: resultado.insertId, ...dados });
    });
}

export function atualizar(req, res) {
    const { id } = req.params;
    const dados = req.body;
    if (!dados.quantidade || dados.quantidade <= 0) {
        return res.status(400).json({ erro: "A quantidade deve ser maior que zero" });
    }
    ItemCarrinhoModel.atualizar(id, dados, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao atualizar item do carrinho", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Item do carrinho não encontrado" });
        }
        res.json({ mensagem: "Item do carrinho atualizado com sucesso" });
    });
}

export function excluir(req, res) {
    const { id } = req.params;
    ItemCarrinhoModel.excluir(id, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao excluir item do carrinho", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Item do carrinho não encontrado" });
        }
        res.json({ mensagem: "Item do carrinho excluído com sucesso" });
    });
}
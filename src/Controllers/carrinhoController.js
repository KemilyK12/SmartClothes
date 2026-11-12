import * as CarrinhoModel from "../Models/carrinhoModel.js";

export function listar(req, res) {
    CarrinhoModel.listar((err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao listar carrinhos", detalhes: err.message });
        }
        res.json(resultados);
    });
}

export function buscarPorId(req, res) {
    const { id } = req.params;
    CarrinhoModel.buscarPorId(id, (err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar carrinho", detalhes: err.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ erro: "Carrinho não encontrado" });
        }
        res.json(resultados[0]);
    });
}

export function criar(req, res) {
    const dados = req.body;
    CarrinhoModel.criar(dados, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao criar carrinho", detalhes: err.message });
        }
        res.status(201).json({ id_carrinho: resultado.insertId, ...dados });
    });
}

export function atualizar(req, res) {
    const { id } = req.params;
    const dados = req.body;
    CarrinhoModel.atualizar(id, dados, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao atualizar carrinho", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Carrinho não encontrado" });
        }
        res.json({ mensagem: "Carrinho atualizado com sucesso" });
    });
}

export function excluir(req, res) {
    const { id } = req.params;
    CarrinhoModel.excluir(id, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao excluir carrinho", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Carrinho não encontrado" });
        }
        res.json({ mensagem: "Carrinho excluído com sucesso" });
    });
}
import * as ProdutoModel from "../Models/produtoModel.js";

export function listar(req, res) {
    ProdutoModel.listar((err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao listar produtos", detalhes: err.message });
        }
        res.json(resultados);
    });
}

export function buscarPorId(req, res) {
    const { id } = req.params;
    ProdutoModel.buscarPorId(id, (err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar produto", detalhes: err.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }
        res.json(resultados[0]);
    });
}

export function criar(req, res) {
    const dados = req.body;
    ProdutoModel.criar(dados, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao criar produto", detalhes: err.message });
        }
        res.status(201).json({ id_produto: resultado.insertId, ...dados });
    });
}

export function atualizar(req, res) {
    const { id } = req.params;
    const dados = req.body;
    ProdutoModel.atualizar(id, dados, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao atualizar produto", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }
        res.json({ mensagem: "Produto atualizado com sucesso" });
    });
}

export function excluir(req, res) {
    const { id } = req.params;
    ProdutoModel.excluir(id, (err, resultado) => {
        if (err) {
            if (err.code === "ER_ROW_IS_REFERENCED_2") {
                return res.status(409).json({ erro: "Produto vinculado a carrinhos ou compras não pode ser excluído" });
            }
            return res.status(500).json({ erro: "Erro ao excluir produto", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }
        res.json({ mensagem: "Produto excluído com sucesso" });
    });
}
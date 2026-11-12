import * as NotaFiscalModel from "../Models/notafiscalModel.js";

export function listar(req, res) {
    NotaFiscalModel.listar((err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao listar notas fiscais", detalhes: err.message });
        }
        res.json(resultados);
    });
}

export function buscarPorId(req, res) {
    const { id } = req.params;
    NotaFiscalModel.buscarPorId(id, (err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar nota fiscal", detalhes: err.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ erro: "Nota fiscal não encontrada" });
        }
        res.json(resultados[0]);
    });
}

export function criar(req, res) {
    const dados = req.body;
    NotaFiscalModel.criar(dados, (err, resultado) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ erro: "Nota fiscal, número ou chave de acesso já cadastrado para esta compra" });
            }
            return res.status(500).json({ erro: "Erro ao emitir nota fiscal", detalhes: err.message });
        }
        res.status(201).json({ id_nota_fiscal: resultado.insertId, ...dados });
    });
}

export function atualizar(req, res) {
    const { id } = req.params;
    const dados = req.body;
    NotaFiscalModel.atualizar(id, dados, (err, resultado) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ erro: "Duplicidade de compra, número da nota ou chave de acesso" });
            }
            return res.status(500).json({ erro: "Erro ao atualizar nota fiscal", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Nota fiscal não encontrada" });
        }
        res.json({ mensagem: "Nota fiscal atualizada com sucesso" });
    });
}

export function excluir(req, res) {
    const { id } = req.params;
    NotaFiscalModel.excluir(id, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao excluir nota fiscal", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Nota fiscal não encontrada" });
        }
        res.json({ mensagem: "Nota fiscal excluída com sucesso" });
    });
}
import * as ClienteModel from "../Models/clienteModel.js";

export function listar(req, res) {
    ClienteModel.listar((err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao listar clientes", detalhes: err.message });
        }
        res.json(resultados);
    });
}

export function buscarPorId(req, res) {
    const { id } = req.params;
    ClienteModel.buscarPorId(id, (err, resultados) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar cliente", detalhes: err.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ erro: "Cliente não encontrado" });
        }
        res.json(resultados[0]);
    });
}

export function criar(req, res) {
    const dados = req.body;
    ClienteModel.criar(dados, (err, resultado) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ erro: "E-mail já cadastrado" });
            }
            return res.status(500).json({ erro: "Erro ao criar cliente", detalhes: err.message });
        }
        res.status(201).json({ id_cliente: resultado.insertId, ...dados });
    });
}

export function atualizar(req, res) {
    const { id } = req.params;
    const dados = req.body;
    ClienteModel.atualizar(id, dados, (err, resultado) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ erro: "E-mail já cadastrado" });
            }
            return res.status(500).json({ erro: "Erro ao atualizar cliente", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Cliente não encontrado" });
        }
        res.json({ mensagem: "Cliente atualizado com sucesso" });
    });
}

export function excluir(req, res) {
    const { id } = req.params;
    ClienteModel.excluir(id, (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao excluir cliente", detalhes: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Cliente não encontrado" });
        }
        res.json({ mensagem: "Cliente excluído com sucesso" });
    });
}
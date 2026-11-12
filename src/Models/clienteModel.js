import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT id_cliente, altura, peso, nome, email, telefone, endereco, data_cadastro FROM CLIENTE_USUARIO ORDER BY id_cliente";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT id_cliente, altura, peso, nome, email, telefone, endereco, data_cadastro FROM CLIENTE_USUARIO WHERE id_cliente = ?";
    conexao.query(sql, [id], callback);
}

export function buscarPorEmail(email, callback) {
    const sql = "SELECT * FROM CLIENTE_USUARIO WHERE email = ?";
    conexao.query(sql, [email], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO CLIENTE_USUARIO (altura, peso, nome, email, senha_hash, telefone, endereco) VALUES (?, ?, ?, ?, ?, ?, ?)";
    conexao.query(
        sql,
        [
            dados.altura,
            dados.peso,
            dados.nome,
            dados.email,
            dados.senha_hash,
            dados.telefone || null,
            dados.endereco || null
        ],
        callback
    );
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE CLIENTE_USUARIO SET altura = ?, peso = ?, nome = ?, email = ?, telefone = ?, endereco = ? WHERE id_cliente = ?";
    conexao.query(
        sql,
        [
            dados.altura,
            dados.peso,
            dados.nome,
            dados.email,
            dados.telefone || null,
            dados.endereco || null,
            id
        ],
        callback
    );
}

export function excluir(id, callback) {
    const sql = "DELETE FROM CLIENTE_USUARIO WHERE id_cliente = ?";
    conexao.query(sql, [id], callback);
}
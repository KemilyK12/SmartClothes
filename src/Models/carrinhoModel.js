import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM CARRINHO ORDER BY id_carrinho";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM CARRINHO WHERE id_carrinho = ?";
    conexao.query(sql, [id], callback);
}

export function buscarPorCliente(id_cliente, callback) {
    const sql = "SELECT * FROM CARRINHO WHERE id_cliente = ? ORDER BY data_criacao DESC";
    conexao.query(sql, [id_cliente], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO CARRINHO (id_cliente, status) VALUES (?, ?)";
    conexao.query(
        sql,
        [
            dados.id_cliente,
            dados.status || 'Ativo'
        ],
        callback
    );
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE CARRINHO SET id_cliente = ?, status = ? WHERE id_carrinho = ?";
    conexao.query(
        sql,
        [
            dados.id_cliente,
            dados.status,
            id
        ],
        callback
    );
}

export function excluir(id, callback) {
    const sql = "DELETE FROM CARRINHO WHERE id_carrinho = ?";
    conexao.query(sql, [id], callback);
}
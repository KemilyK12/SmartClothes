import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM NOTA_FISCAL ORDER BY id_nota_fiscal";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM NOTA_FISCAL WHERE id_nota_fiscal = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO NOTA_FISCAL (id_compra, id_cliente, numero_nota, valor_total, chave_acesso) VALUES (?, ?, ?, ?, ?)";
    conexao.query(
        sql,
        [
            dados.id_compra,
            dados.id_cliente,
            dados.numero_nota,
            dados.valor_total,
            dados.chave_acesso
        ],
        callback
    );
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE NOTA_FISCAL SET id_compra = ?, id_cliente = ?, numero_nota = ?, valor_total = ?, chave_acesso = ? WHERE id_nota_fiscal = ?";
    conexao.query(
        sql,
        [
            dados.id_compra,
            dados.id_cliente,
            dados.numero_nota,
            dados.valor_total,
            dados.chave_acesso,
            id
        ],
        callback
    );
}

export function excluir(id, callback) {
    const sql = "DELETE FROM NOTA_FISCAL WHERE id_nota_fiscal = ?";
    conexao.query(sql, [id], callback);
}
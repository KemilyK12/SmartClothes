import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM COMPRA_VENDA ORDER BY data_compra DESC";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM COMPRA_VENDA WHERE id_compra = ?";
    conexao.query(sql, [id], callback);
}

export function buscarPorCliente(id_cliente, callback) {
    const sql = "SELECT * FROM COMPRA_VENDA WHERE id_cliente = ? ORDER BY data_compra DESC";
    conexao.query(sql, [id_cliente], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO COMPRA_VENDA (id_cliente, valor_total, forma_pagamento, status) VALUES (?, ?, ?, ?)";
    conexao.query(
        sql,
        [
            dados.id_cliente,
            dados.valor_total,
            dados.forma_pagamento,
            dados.status || 'Pendente'
        ],
        callback
    );
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE COMPRA_VENDA SET valor_total = ?, forma_pagamento = ?, status = ? WHERE id_compra = ?";
    conexao.query(
        sql,
        [
            dados.valor_total,
            dados.forma_pagamento,
            dados.status,
            id
        ],
        callback
    );
}

export function excluir(id, callback) {
    const sql = "DELETE FROM COMPRA_VENDA WHERE id_compra = ?";
    conexao.query(sql, [id], callback);
}
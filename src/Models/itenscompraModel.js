import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM ITEM_COMPRA ORDER BY id_item_compra";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM ITEM_COMPRA WHERE id_item_compra = ?";
    conexao.query(sql, [id], callback);
}

export function buscarPorCompra(id_compra, callback) {
    const sql = `
        SELECT ic.*, p.nome AS nome_produto, p.tamanho, p.cor 
        FROM ITEM_COMPRA ic
        INNER JOIN PRODUTO p ON ic.id_produto = p.id_produto
        WHERE ic.id_compra = ?
    `;
    conexao.query(sql, [id_compra], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO ITEM_COMPRA (id_compra, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)";
    conexao.query(
        sql,
        [
            dados.id_compra,
            dados.id_produto,
            dados.quantidade,
            dados.preco_unitario
        ],
        callback
    );
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE ITEM_COMPRA SET quantidade = ?, preco_unitario = ? WHERE id_item_compra = ?";
    conexao.query(
        sql,
        [
            dados.quantidade,
            dados.preco_unitario,
            id
        ],
        callback
    );
}

export function excluir(id, callback) {
    const sql = "DELETE FROM ITEM_COMPRA WHERE id_item_compra = ?";
    conexao.query(sql, [id], callback);
}
import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM ITEM_CARRINHO ORDER BY id_item_carrinho";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM ITEM_CARRINHO WHERE id_item_carrinho = ?";
    conexao.query(sql, [id], callback);
}

export function buscarPorCarrinho(id_carrinho, callback) {
    const sql = `
        SELECT ic.*, p.nome AS nome_produto, p.tamanho, p.cor 
        FROM ITEM_CARRINHO ic
        INNER JOIN PRODUTO p ON ic.id_produto = p.id_produto
        WHERE ic.id_carrinho = ?
    `;
    conexao.query(sql, [id_carrinho], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO ITEM_CARRINHO (id_carrinho, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)";
    conexao.query(
        sql,
        [
            dados.id_carrinho,
            dados.id_produto,
            dados.quantidade,
            dados.preco_unitario
        ],
        callback
    );
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE ITEM_CARRINHO SET quantidade = ?, preco_unitario = ? WHERE id_item_carrinho = ?";
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
    const sql = "DELETE FROM ITEM_CARRINHO WHERE id_item_carrinho = ?";
    conexao.query(sql, [id], callback);
}
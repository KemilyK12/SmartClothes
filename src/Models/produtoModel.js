import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM PRODUTO ORDER BY id_produto";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM PRODUTO WHERE id_produto = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO PRODUTO (nome, descricao, categoria, tamanho, cor, preco, estoque, tecnologia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    conexao.query(
        sql,
        [
            dados.nome,
            dados.descricao || null,
            dados.categoria || null,
            dados.tamanho || null,
            dados.cor || null,
            dados.preco,
            dados.estoque ?? 0,
            dados.tecnologia || null
        ],
        callback
    );
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE PRODUTO SET nome = ?, descricao = ?, categoria = ?, tamanho = ?, cor = ?, preco = ?, estoque = ?, tecnologia = ? WHERE id_produto = ?";
    conexao.query(
        sql,
        [
            dados.nome,
            dados.descricao || null,
            dados.categoria || null,
            dados.tamanho || null,
            dados.cor || null,
            dados.preco,
            dados.estoque ?? 0,
            dados.tecnologia || null,
            id
        ],
        callback
    );
}

export function excluir(id, callback) {
    const sql = "DELETE FROM PRODUTO WHERE id_produto = ?";
    conexao.query(sql, [id], callback);
}
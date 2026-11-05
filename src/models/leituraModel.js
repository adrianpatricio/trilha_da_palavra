var database = require("../database/config");

function listarLivros(idUsuario) {
    var instrucaoSql = `
        SELECT
            livro.id_livro,
            livro.nome_livro,
            livro.testamento,
            livro.quantidade_capitulos,
            COUNT(leitura.id_leitura) AS capitulos_lidos
        FROM 
        livro LEFT JOIN leitura ON leitura.fk_livro = livro.id_livro
        AND
        leitura.fk_usuario = ?
        GROUP BY livro.id_livro
        ORDER BY livro.id_livro;
    `;

    console.log('Executando a instrução SQL: \n' + instrucaoSql);

    return database.executar(instrucaoSql, [idUsuario]);
}

function listarCapitulos(idUsuario, idLivro) {
    var instrucaoSql = `
        SELECT capitulo FROM leitura WHERE fk_usuario = ? AND fk_livro = ? ORDER BY capitulo;
    `;

    console.log('Executando a instrução SQL: \n' + instrucaoSql);

    return database.executar(instrucaoSql, [idUsuario, idLivro]);
}

function buscarLivro(idLivro) {
    var instrucaoSql = `
        SELECT id_livro, quantidade_capitulos FROM livro WHERE id_livro = ?;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [idLivro]);
}

function marcar(idUsuario, idLivro, capitulo) {
    var instrucaoSql = `
        INSERT INTO leitura (fk_usuario, fk_livro, capitulo, data_leitura) VALUES (?, ?, ?, CURDATE());
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [idUsuario, idLivro, capitulo]);
}

function marcarVarios(idUsuario, idLivro, capitulos) {
    var linhas = [];
    var valores = [];

    for (var i = 0; i < capitulos.length; i++) {
        linhas.push("(?, ?, ?, CURDATE())");
        valores.push(idUsuario, idLivro, capitulos[i]);
    }

    var instrucaoSql = `
        INSERT INTO leitura (fk_usuario, fk_livro, capitulo, data_leitura) VALUES ${linhas.join(", ")};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, valores);
}

function desmarcar(idUsuario, idLivro, capitulo) {
    var instrucaoSql = `
        DELETE FROM leitura WHERE fk_usuario = ? AND fk_livro = ? AND capitulo = ?;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [idUsuario, idLivro, capitulo]);
}

function buscarUltimaLeitura(idUsuario) {
    var instrucaoSql = `
        SELECT livro.nome_livro, leitura.capitulo,
            DATEDIFF(CURDATE(), leitura.data_leitura) AS dias_atras
        FROM leitura
        JOIN livro ON livro.id_livro = leitura.fk_livro
        WHERE leitura.fk_usuario = ?
        ORDER BY leitura.data_leitura DESC, leitura.id_leitura DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [idUsuario]);
}

function listarLeiturasPorDia(idUsuario) {
    var instrucaoSql = `
        SELECT DATEDIFF(CURDATE(), data_leitura) AS dias_atras, COUNT(*) AS capitulos
        FROM leitura
        WHERE fk_usuario = ?
        GROUP BY data_leitura
        ORDER BY data_leitura DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [idUsuario]);
}

module.exports = {
    listarLivros,
    listarCapitulos,
    buscarLivro,
    marcar,
    marcarVarios,
    desmarcar,
    buscarUltimaLeitura,
    listarLeiturasPorDia
};
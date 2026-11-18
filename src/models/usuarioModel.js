var database = require("../database/config")

function buscarEmail(email) {
    var instrucaoSql = `
        SELECT id_usuario, nome_usuario, email_usuario, senha_usuario, tipo_usuario FROM usuario WHERE email_usuario = ?;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [email]);
}

function cadastrar(nome, email, senha, livroFavorito) {
    var instrucaoSql = `
        INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, fk_livro_favorito) VALUES (?, ?, ?, ?);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [nome, email, senha, livroFavorito]);
}

function buscarPerfil(idUsuario) {
    var instrucaoSql = `
        SELECT nome_usuario, email_usuario, tipo_usuario, avatar_usuario, fk_livro_favorito,
            DATE_FORMAT(data_cadastro, '%d/%m/%Y') AS data_cadastro
        FROM usuario WHERE id_usuario = ?;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [idUsuario]);
}

module.exports = {
    buscarEmail,
    cadastrar,
    buscarPerfil
};
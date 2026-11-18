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
        SELECT nome_usuario, email_usuario, tipo_usuario, avatar_usuario, foto_usuario, fk_livro_favorito,
            DATE_FORMAT(data_cadastro, '%d/%m/%Y') AS data_cadastro
        FROM usuario WHERE id_usuario = ?;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [idUsuario]);
}

// Salva o nome, o livro favorito e o avatar escolhidos no perfil
function atualizarPerfil(idUsuario, nome, livroFavorito, avatar) {
    var instrucaoSql = `
        UPDATE usuario SET nome_usuario = ?, fk_livro_favorito = ?, avatar_usuario = ? WHERE id_usuario = ?;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [nome, livroFavorito, avatar, idUsuario]);
}

// Senha salva, para conferir a "senha atual" antes de trocar
function buscarSenha(idUsuario) {
    var instrucaoSql = `
        SELECT senha_usuario FROM usuario WHERE id_usuario = ?;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [idUsuario]);
}

function atualizarSenha(idUsuario, novaSenha) {
    var instrucaoSql = `
        UPDATE usuario SET senha_usuario = ? WHERE id_usuario = ?;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [novaSenha, idUsuario]);
}

// Salva a foto (texto base64) ou apaga a foto, quando recebe null
function atualizarFoto(idUsuario, foto) {
    var instrucaoSql = `
        UPDATE usuario SET foto_usuario = ? WHERE id_usuario = ?;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [foto, idUsuario]);
}

module.exports = {
    buscarEmail,
    cadastrar,
    buscarPerfil,
    atualizarPerfil,
    buscarSenha,
    atualizarSenha,
    atualizarFoto
};
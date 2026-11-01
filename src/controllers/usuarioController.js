var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined || email.trim() == '') {
        res.status(400).send('Informe seu e-mail.');
    } else if (senha == undefined || senha == '') {
        res.status(400).send('Informe sua senha.');
    } else {

        usuarioModel.buscarEmail(email.trim().toLowerCase())
            .then(
                function (resultado) {
                    if (resultado.length == 1 && resultado[0].senha_usuario == senha) {
                        res.json({
                            id: resultado[0].id_usuario,
                            nome: resultado[0].nome_usuario,
                            email: resultado[0].email_usuario,
                            tipo: resultado[0].tipo_usuario
                        });
                    } else {
                        res.status(401).send('E-mail e/ou senha inválido(s).');
                    }
                }
            ).catch(
                function (erro) {
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);

                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var livroFavorito = req.body.livroFavoritoServer;

    if (nome == undefined || nome.trim() == "") {
        res.status(400).send("Informe seu nome.");
    } else if (email == undefined || !email.includes("@") || !email.includes(".")) {
        res.status(400).send("Informe um e-mail válido.");
    } else if (senha == undefined || senha.length < 6) {
        res.status(400).send("A senha deve ter no mínimo 6 caracteres.");
    } else {

        if (livroFavorito == undefined || livroFavorito == "") {
            livroFavorito = null
        }   

        usuarioModel.cadastrar(nome.trim(), email.trim().toLowerCase(), senha, livroFavorito)
            .then(
                function (resultado) {
                    res.status(201).json(resultado);
                }
            ).catch(
                function (erro) {
                    if (erro.code == "ER_DUP_ENTRY") {
                        res.status(409).send("Este e-mail já está cadastrado.");
                    } else {
                        console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);

                        res.status(500).json(erro.sqlMessage);
                    }
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}
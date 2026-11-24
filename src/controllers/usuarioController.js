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
                            email: resultado[0].email_usuario
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

// Confere as regras da senha, caractere por caractere (a mesma lógica do cadastro.html).
// Devolve as regras que não foram cumpridas, uma por linha, ou "" se a senha estiver certa.
function validarSenha(senha) {
    if (senha == undefined) {
        senha = "";
    }

    var especiais = "!@#$%&*?_-";

    // bandeiras: começam falsas e viram verdadeiras quando o tipo de caractere aparece
    var temMaiuscula = false;
    var temMinuscula = false;
    var temEspecial = false;

    for (var i = 0; i < senha.length; i++) {
        var caractere = senha[i];

        if (caractere >= "A" && caractere <= "Z") {
            temMaiuscula = true;
        } else if (caractere >= "a" && caractere <= "z") {
            temMinuscula = true;
        } else if (especiais.includes(caractere)) {
            temEspecial = true;
        }
    }

    var erros = [];

    if (senha.length < 6) {
        erros.push("A senha deve ter no mínimo 6 caracteres.");
    }

    if (!temMaiuscula) {
        erros.push("A senha precisa ter pelo menos uma letra maiúscula.");
    }

    if (!temMinuscula) {
        erros.push("A senha precisa ter pelo menos uma letra minúscula.");
    }

    if (!temEspecial) {
        erros.push("A senha precisa ter pelo menos um caractere especial (! @ # $ % & * ? _ -).");
    }

    return erros.join("\n");
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var livroFavorito = req.body.livroFavoritoServer;

    var errosSenha = validarSenha(senha);

    if (nome == undefined || nome.trim() == "") {
        res.status(400).send("Informe seu nome.");
    } else if (email == undefined || !email.includes("@") || !email.includes(".")) {
        res.status(400).send("Informe um e-mail válido.");
    } else if (errosSenha != "") {
        res.status(400).send(errosSenha);
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

function buscarPerfil(req, res) {
    var idUsuario = req.params.idUsuario;

    usuarioModel.buscarPerfil(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length == 0) {
                    res.status(404).send("Usuário não encontrado.");
                } else {
                    res.status(200).json(resultado[0]);
                }
            }
        ).catch(
            function (erro) {
                console.log("\nHouve um erro ao buscar o perfil! Erro: ", erro.sqlMessage);

                res.status(500).json(erro.sqlMessage);
            }
        );
}

// Avatares que existem no site (os mesmos "data-avatar" do perfil.html)
var avataresValidos = ["inicial", "jesus", "maria", "jose", "moises", "davi", "ester", "daniel", "pedro", "paulo", "joao_batista"];

function atualizarPerfil(req, res) {
    var idUsuario = req.params.idUsuario;
    var nome = req.body.nomeServer;
    var livroFavorito = req.body.livroFavoritoServer;
    var avatar = req.body.avatarServer;

    if (nome == undefined || nome.trim() == "") {
        res.status(400).send("Informe seu nome.");
    } else if (!avataresValidos.includes(avatar)) {
        res.status(400).send("Avatar inválido.");
    } else {

        if (livroFavorito == undefined || livroFavorito == "") {
            livroFavorito = null;
        }

        usuarioModel.atualizarPerfil(idUsuario, nome.trim(), livroFavorito, avatar)
            .then(
                function (resultado) {
                    // affectedRows = quantas linhas o UPDATE alterou (0 = esse id não existe)
                    if (resultado.affectedRows == 0) {
                        res.status(404).send("Usuário não encontrado.");
                    } else {
                        res.status(200).send("Perfil atualizado.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log("\nHouve um erro ao atualizar o perfil! Erro: ", erro.sqlMessage);

                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function alterarSenha(req, res) {
    var idUsuario = req.params.idUsuario;
    var senhaAtual = req.body.senhaAtualServer;
    var novaSenha = req.body.novaSenhaServer;

    if (senhaAtual == undefined || senhaAtual == "") {
        res.status(400).send("Informe sua senha atual.");
    } else if (novaSenha == undefined || novaSenha.length < 6) {
        res.status(400).send("A nova senha deve ter no mínimo 6 caracteres.");
    } else if (novaSenha == senhaAtual) {
        res.status(400).send("A nova senha precisa ser diferente da atual.");
    } else {

        // Primeiro confere a senha atual; só depois salva a nova
        usuarioModel.buscarSenha(idUsuario)
            .then(
                function (resultado) {
                    if (resultado.length == 0) {
                        res.status(404).send("Usuário não encontrado.");
                    } else if (resultado[0].senha_usuario != senhaAtual) {
                        res.status(401).send("Senha atual incorreta.");
                    } else {
                        return usuarioModel.atualizarSenha(idUsuario, novaSenha)
                            .then(
                                function () {
                                    res.status(200).send("Senha alterada.");
                                }
                            );
                    }
                }
            ).catch(
                function (erro) {
                    console.log("\nHouve um erro ao alterar a senha! Erro: ", erro.sqlMessage);

                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// 1 MB de imagem vira cerca de 1,4 milhão de caracteres em base64
var tamanhoMaximoFoto = 1400000;

function salvarFoto(req, res) {
    var idUsuario = req.params.idUsuario;
    var foto = req.body.fotoServer;

    if (foto == undefined || foto == "") {
        res.status(400).send("Escolha uma imagem.");
    } else if (!foto.startsWith("data:image/png;base64,") && !foto.startsWith("data:image/jpeg;base64,")) {
        res.status(400).send("A foto precisa ser JPG ou PNG.");
    } else if (foto.length > tamanhoMaximoFoto) {
        res.status(400).send("A foto deve ter no máximo 1 MB.");
    } else {

        usuarioModel.atualizarFoto(idUsuario, foto)
            .then(
                function (resultado) {
                    if (resultado.affectedRows == 0) {
                        res.status(404).send("Usuário não encontrado.");
                    } else {
                        res.status(200).send("Foto salva.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log("\nHouve um erro ao salvar a foto! Erro: ", erro.sqlMessage);

                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function removerFoto(req, res) {
    var idUsuario = req.params.idUsuario;

    // null apaga a foto; a pessoa volta a usar o avatar escolhido
    usuarioModel.atualizarFoto(idUsuario, null)
        .then(
            function (resultado) {
                if (resultado.affectedRows == 0) {
                    res.status(404).send("Usuário não encontrado.");
                } else {
                    res.status(200).send("Foto removida.");
                }
            }
        ).catch(
            function (erro) {
                console.log("\nHouve um erro ao remover a foto! Erro: ", erro.sqlMessage);

                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    autenticar,
    cadastrar,
    buscarPerfil,
    atualizarPerfil,
    alterarSenha,
    salvarFoto,
    removerFoto
}
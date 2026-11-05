var leituraModel = require("../models/leituraModel");

function listarLivros(req, res) {
    var idUsuario = req.params.idUsuario;

    leituraModel.listarLivros(idUsuario)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log("\nHouve um erro ao listar os livros! Erro: ", erro.sqlMessage);

                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarCapitulos(req, res) {
    var idUsuario = req.params.idUsuario;
    var idLivro = req.params.idLivro;

    leituraModel.listarCapitulos(idUsuario, idLivro)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log("\nHouve um erro ao listar os capítulos! Erro: ", erro.sqlMessage);

                res.status(500).json(erro.sqlMessage);
            }
        );
}

function marcar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idLivro = req.body.idLivroServer;
    var capitulo = Number(req.body.capituloServer);

    if (idUsuario == undefined || idLivro == undefined) {
        res.status(400).send("Usuário ou livro não informado.");

        return;
    }

    leituraModel.buscarLivro(idLivro)
        .then(
            function (livro) {
                if (livro.length == 0) {
                    res.status(404).send("Livro não encontrado.");
                } else if (!Number.isInteger(capitulo) || capitulo < 1 || capitulo > livro[0].quantidade_capitulos) {
                    res.status(400).send("Capítulo inválido para este livro.");
                } else {
                    return leituraModel.marcar(idUsuario, idLivro, capitulo)
                
                        .then(
                            function (resultado) {
                            res.status(201).json(resultado);
                            }
                        );
                }
            }
        )
        .catch (
            function (erro) {
                if (erro.code == "ER_DUP_ENTRY") {
                    res.status(409).send("Este capítulo já está marcado.");
                } else {
                    console.log("\nHouve um erro ao marcar o capítulo! Erro: ", erro.sqlMessage);

                    res.status(500).json(erro.sqlMessage);
                }
            }
        );
}

function marcarLivro(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idLivro = req.body.idLivroServer;

    if (idUsuario == undefined || idLivro == undefined) {
        res.status(400).send("Usuário ou livro não informado.");

        return;
    }

    leituraModel.buscarLivro(idLivro)
        .then(
            function (livro) {
                if (livro.length == 0) {
                    res.status(404).send("Livro não encontrado.");

                    return;
                }

                return leituraModel.listarCapitulos(idUsuario, idLivro)
                    .then(
                        function (lidos) {
                            var faltam = [];

                            for (var cap = 1; cap <= livro[0].quantidade_capitulos; cap++) {
                                var jaLido = false;

                                for (var i = 0; i < lidos.length; i++) {
                                    if (lidos[i].capitulo == cap) {
                                        jaLido = true;
                                    }
                                }

                                if (!jaLido) {
                                    faltam.push(cap);
                                }
                            }

                            if (faltam.length == 0) {
                                res.status(200).send("Este livro já está concluído.");

                                return;
                            }

                            return leituraModel.marcarVarios(idUsuario, idLivro, faltam)
                                .then(
                                    function (resultado) {
                                        res.status(201).json(resultado);
                                    }
                                );
                        }
                    );
            }
        )
        .catch(
            function (erro) {
                console.log("\nHouve um erro ao marcar o livro! Erro: ", erro.sqlMessage);

                res.status(500).json(erro.sqlMessage);
            }
        );
}

function desmarcar(req, res) {
    var idUsuario = req.params.idUsuario;
    var idLivro = req.params.idLivro;
    var capitulo = req.params.capitulo;

    leituraModel.desmarcar(idUsuario, idLivro, capitulo)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log("\nHouve um erro ao desmarcar o capítulo! Erro: ", erro.sqlMessage);

                res.status(500).json(erro.sqlMessage);
            }
        );
}

// Próxima leitura = o primeiro capítulo ainda não lido, na ordem da Bíblia.
// Fica separada para ser usada também pela página Progresso.
function calcularProxima(idUsuario) {
    return leituraModel.listarLivros(idUsuario)
        .then(
            function (livros) {
                var livro = null;

                for (var i = 0; i < livros.length; i++) {
                    if (livros[i].capitulos_lidos < livros[i].quantidade_capitulos) {
                        livro = livros[i];

                        break;
                    }
                }

                // A Bíblia inteira foi lida
                if (livro == null) {
                    return null;
                }

                return leituraModel.listarCapitulos(idUsuario, livro.id_livro)
                    .then(
                        function (lidos) {
                            var capitulo = 1;

                            for (var i = 0; i < lidos.length; i++) {
                                if (lidos[i].capitulo == capitulo) {
                                    capitulo++;
                                }
                            }

                            return {
                                idLivro: livro.id_livro,
                                nomeLivro: livro.nome_livro,
                                testamento: livro.testamento,
                                capitulo: capitulo,
                                quantidadeCapitulos: livro.quantidade_capitulos,
                                capitulosLidos: livro.capitulos_lidos
                            };
                        }
                    );
            }
        );
}

function buscarProxima(req, res) {
    var idUsuario = req.params.idUsuario;

    calcularProxima(idUsuario)
        .then(
            function (proxima) {
                res.status(200).json(proxima);
            }
        )
        .catch(
            function (erro) {
                console.log("\nHouve um erro ao buscar a próxima leitura! Erro: ", erro.sqlMessage);

                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarLivros,
    listarCapitulos,
    marcar,
    marcarLivro,
    desmarcar,
    buscarProxima
};
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

function buscarProgresso(req, res) {
    var idUsuario = req.params.idUsuario;

    Promise.all([
        leituraModel.listarLivros(idUsuario),
        leituraModel.buscarUltimaLeitura(idUsuario),
        leituraModel.listarLeiturasPorDia(idUsuario),
        calcularProxima(idUsuario)
    ])
        .then(
            function (resultados) {
                var livros = resultados[0];
                var ultima = resultados[1];
                var dias = resultados[2];
                var proxima = resultados[3];

                // Totais da Bíblia e de cada testamento
                var capitulosLidos = 0;
                var totalCapitulos = 0;
                var antigo = { lidos: 0, total: 0 };
                var novo = { lidos: 0, total: 0 };
                var livrosConcluidos = 0;

                for (var i = 0; i < livros.length; i++) {
                    capitulosLidos += livros[i].capitulos_lidos;
                    totalCapitulos += livros[i].quantidade_capitulos;

                    if (livros[i].testamento == "AT") {
                        antigo.lidos += livros[i].capitulos_lidos;
                        antigo.total += livros[i].quantidade_capitulos;
                    } else {
                        novo.lidos += livros[i].capitulos_lidos;
                        novo.total += livros[i].quantidade_capitulos;
                    }

                    if (livros[i].capitulos_lidos == livros[i].quantidade_capitulos) {
                        livrosConcluidos++;
                    }
                }

                // Sequência: dias seguidos com leitura, contando de hoje (ou de ontem) para trás
                var sequencia = 0;

                if (dias.length > 0 && dias[0].dias_atras <= 1) {
                    sequencia = 1;

                    for (var i = 1; i < dias.length; i++) {
                        if (dias[i].dias_atras == dias[i - 1].dias_atras + 1) {
                            sequencia++;
                        } else {
                            break;
                        }
                    }
                }

                // Capítulos lidos de hoje até 6 dias atrás
                var ultimos7Dias = 0;

                for (var i = 0; i < dias.length; i++) {
                    if (dias[i].dias_atras <= 6) {
                        ultimos7Dias += dias[i].capitulos;
                    }
                }

                var ultimaLeitura = null;

                if (ultima.length > 0) {
                    ultimaLeitura = {
                        nomeLivro: ultima[0].nome_livro,
                        capitulo: ultima[0].capitulo,
                        diasAtras: ultima[0].dias_atras
                    };
                }

                res.status(200).json({
                    capitulosLidos: capitulosLidos,
                    totalCapitulos: totalCapitulos,
                    antigo: antigo,
                    novo: novo,
                    livrosConcluidos: livrosConcluidos,
                    totalLivros: livros.length,
                    sequencia: sequencia,
                    ultimos7Dias: ultimos7Dias,
                    ultimaLeitura: ultimaLeitura,
                    proxima: proxima
                });
            }
        )
        .catch(
            function (erro) {
                console.log("\nHouve um erro ao buscar o progresso! Erro: ", erro.sqlMessage);

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
    buscarProxima,
    buscarProgresso
};
var express = require("express");
var router = express.Router();

var leituraController = require("../controllers/leituraController");

router.get("/livros/:idUsuario", function (req, res) {
    leituraController.listarLivros(req, res);
});

router.get("/capitulos/:idUsuario/:idLivro", function (req, res) {
    leituraController.listarCapitulos(req, res);
});

router.post("/marcar", function (req, res) {
    leituraController.marcar(req, res);
});

router.post("/marcar-livro", function (req, res) {
    leituraController.marcarLivro(req, res);
});

router.delete("/desmarcar/:idUsuario/:idLivro/:capitulo", function (req, res) {
    leituraController.desmarcar(req, res);
});

module.exports = router;
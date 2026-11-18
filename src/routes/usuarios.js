var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/perfil/:idUsuario", function (req, res) {
    usuarioController.buscarPerfil(req, res);
});

router.put("/atualizar/:idUsuario", function (req, res) {
    usuarioController.atualizarPerfil(req, res);
});

router.put("/senha/:idUsuario", function (req, res) {
    usuarioController.alterarSenha(req, res);
});

router.put("/foto/:idUsuario", function (req, res) {
    usuarioController.salvarFoto(req, res);
});

router.delete("/foto/:idUsuario", function (req, res) {
    usuarioController.removerFoto(req, res);
});

module.exports = router;
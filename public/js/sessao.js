// sessão
function exigirLogin() {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location = "./login.html";
    }
}

// mensagens dos formulários (login e cadastro)
function mostrarMensagem(idSpan, texto) {
    var span = document.getElementById(idSpan);
    span.textContent = texto;
    span.classList.add("ativa");
}

function limparMensagens() {
    var spans = document.querySelectorAll(".mensagem_erro, .mensagem_erro_campo");

    for (var i = 0; i < spans.length; i++) {
        spans[i].textContent = "";
        spans[i].classList.remove("ativa");
    }
}
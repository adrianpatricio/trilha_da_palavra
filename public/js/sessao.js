// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
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
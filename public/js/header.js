var header = document.getElementById("header");

var pagina = header.dataset.pagina;
var nomeUsuario = sessionStorage.NOME_USUARIO;

var links = "";

// Entrar e Criar conta usam o header simples, sem a caixa.
if (pagina == "login" || pagina == "cadastro") {
    header.classList.add("header_simples");

    var botaoConta = `<a href="./cadastro.html" class="header_botao">Criar conta</a>`;

    if (pagina == "cadastro") {
        botaoConta = `<a href="./login.html" class="header_botao header_botao_claro">Entrar</a>`;
    }

    links = `
        <a href="./index.html" class="header_link">Início</a>
        <a href="#" class="header_link">Explicações</a>
        <a href="./sobre.html" class="header_link">Sobre o projeto</a>
        ${botaoConta}
    `;
} else if (nomeUsuario != undefined) {
    // usuário logado
    links = `
        <a href="./index.html" class="header_link" data-link="inicio">Início</a>
        <a href="./biblia.html" class="header_link" data-link="biblia">Bíblia</a>
        <a href="./dashboard.html" class="header_link" data-link="progresso">Progresso</a>

        <span class="header_divisor"></span>

        <span class="header_ola">Olá, <span id="nome_usuario_header"></span></span>
        <a href="#" class="header_botao" onclick="sair()">Sair</a>
    `;
} else {
    // visitante
    links = `
        <a href="./index.html" class="header_link" data-link="inicio">Início</a>
        <a href="#" class="header_link" data-link="explicacoes">Explicações</a>
        <a href="./sobre.html" class="header_link" data-link="sobre">Sobre o projeto</a>

        <span class="header_divisor"></span>

        <a href="./login.html" class="header_link header_link_escuro">Entrar</a>
        <a href="./cadastro.html" class="header_botao">Criar conta</a>
    `;
}

header.innerHTML = `
    <section class="header_conteudo">
        <a href="./index.html" class="section_logo">
            <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="logo_arco" d="M5 27V12a10 10 0 0 1 20 0v15" stroke-width="2.2" stroke-linecap="round"/>
                <path class="logo_caminho" d="M15 27c-3-4 4-6 1-10s3-5 1-8" stroke-width="2.2" stroke-linecap="round"/>
            </svg>

            Trilha da Palavra
        </a>

        <nav class="nav_links">
            ${links}
        </nav>
    </section>
`;

// Destaca o link da página atual.
var atual = header.querySelector("[data-link=\"" + pagina + "\"]");

if (atual) {
    atual.classList.add("header_link_ativo");
}

if (nomeUsuario != undefined && document.getElementById("nome_usuario_header")) {
    document.getElementById("nome_usuario_header").textContent = nomeUsuario;
}

function sair() {
    sessionStorage.clear();
    window.location = "./login.html";
}

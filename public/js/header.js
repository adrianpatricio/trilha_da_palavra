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
        <a href="./explicacoes.html" class="header_link">Explicações</a>
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
        <a href="./explicacoes.html" class="header_link" data-link="explicacoes">Explicações</a>
        <a href="./sobre.html" class="header_link" data-link="sobre">Sobre o projeto</a>

        <span class="header_divisor"></span>

        <a href="./login.html" class="header_link header_link_escuro">Entrar</a>
        <a href="./cadastro.html" class="header_botao">Criar conta</a>
    `;
}

var logo = `
    <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="logo_arco" d="M5 27V12a10 10 0 0 1 20 0v15" stroke-width="2.2" stroke-linecap="round"/>
        <path class="logo_caminho" d="M15 27c-3-4 4-6 1-10s3-5 1-8" stroke-width="2.2" stroke-linecap="round"/>
    </svg>

    Trilha da Palavra
`;

// Bíblia usa o menu lateral no lugar do header em caixa.
if (pagina == "biblia") {
    header.classList.add("header_lateral");

    header.innerHTML = `
        <a href="./index.html" class="menu_logo">${logo}</a>

        <nav class="menu_links">
            <a href="./index.html" class="menu_link" data-link="inicio">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                </svg>

                Início
            </a>

            <a href="./biblia.html" class="menu_link" data-link="biblia">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 2.25H6a3 3 0 0 1 3 3v10.5a2.25 2.25 0 0 0-2.25-2.25H1.5V2.25ZM16.5 2.25H12a3 3 0 0 0-3 3v10.5a2.25 2.25 0 0 1 2.25-2.25h5.25V2.25Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>

                Bíblia
            </a>

            <a href="./dashboard.html" class="menu_link" data-link="progresso">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.25 2.25V15.75H15.75M13.5 12.75V6.75M9.75 12.75V3.75M6 12.75V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                Progresso
            </a>
        </nav>

        <section class="menu_usuario">
            <span id="inicial_usuario_header" class="menu_inicial"></span>

            <p class="menu_ola">Olá, <span id="nome_usuario_header"></span></p>

            <a href="#" class="menu_sair" onclick="sair()">Sair</a>
        </section>
    `;
} else {
    header.innerHTML = `
        <section class="header_conteudo">
            <a href="./index.html" class="section_logo">${logo}</a>

            <nav class="nav_links">
                ${links}
            </nav>
        </section>
    `;
}

// Destaca o link da página atual.
var atual = header.querySelector("[data-link=\"" + pagina + "\"]");

if (atual) {
    atual.classList.add("header_link_ativo");
}

if (nomeUsuario != undefined && document.getElementById("nome_usuario_header")) {
    document.getElementById("nome_usuario_header").textContent = nomeUsuario;
}

// Primeira letra do nome, no círculo do menu lateral.
if (nomeUsuario != undefined && document.getElementById("inicial_usuario_header")) {
    document.getElementById("inicial_usuario_header").textContent = nomeUsuario[0].toUpperCase();
}

function sair() {
    sessionStorage.clear();
    window.location = "./login.html";
}

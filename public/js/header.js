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
        <a href="./inicio.html" class="header_link" data-link="inicio_leitor">Início</a>
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

// Início do leitor, Bíblia e Perfil usam o menu lateral no lugar do header em caixa.
if (pagina == "inicio_leitor" || pagina == "biblia" || pagina == "perfil") {
    header.classList.add("header_lateral");

    header.innerHTML = `
        <a href="./inicio.html" class="menu_logo">${logo}</a>

        <nav class="menu_links">
            <a href="./inicio.html" class="menu_link" data-link="inicio_leitor">
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

        <section class="menu_conta">
            <!-- caixa do menu da conta: aparece quando o botão de baixo é clicado -->
            <section id="menu_conta_caixa" class="menu_conta_caixa">
                <section class="menu_conta_topo">
                    <span id="inicial_menu_conta" class="menu_inicial menu_inicial_grande"></span>

                    <span>
                        <span id="nome_menu_conta" class="menu_conta_nome"></span>
                        <span id="email_menu_conta" class="menu_conta_email"></span>
                    </span>
                </section>

                <a href="./perfil.html" class="menu_conta_item">
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="2.25" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>

                    Perfil e conta
                </a>

                <a href="./sobre.html" class="menu_conta_item">
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="6.5" r="3" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M3.5 15.5c.8-2.6 3-4 5.5-4s4.7 1.4 5.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>

                    Sobre o projeto
                </a>

                <a href="./explicacoes.html" class="menu_conta_item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>
                        <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    </svg>

                    Explicações
                </a>

                <span class="menu_conta_divisor"></span>

                <a href="#" class="menu_conta_item" onclick="sair()">
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 15.75H3.75a1.5 1.5 0 0 1-1.5-1.5V3.75a1.5 1.5 0 0 1 1.5-1.5H7M12 12.75 15.75 9 12 5.25M15.75 9H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    Sair
                </a>
            </section>

            <button id="btn_menu_conta" class="menu_usuario" onclick="abrirMenuConta()">
                <span id="inicial_usuario_header" class="menu_inicial"></span>

                <span id="primeiro_nome_header" class="menu_ola"></span>

                <svg class="menu_seta" width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7.5L6 4.5L9 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
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

// Dados do menu da conta, no menu lateral.
if (nomeUsuario != undefined && document.getElementById("menu_conta_caixa")) {
    var inicial = nomeUsuario[0].toUpperCase();

    document.getElementById("inicial_usuario_header").textContent = inicial;
    document.getElementById("inicial_menu_conta").textContent = inicial;
    document.getElementById("primeiro_nome_header").textContent = nomeUsuario.split(" ")[0];
    document.getElementById("nome_menu_conta").textContent = nomeUsuario;
    document.getElementById("email_menu_conta").textContent = sessionStorage.EMAIL_USUARIO;

    // Enquanto o servidor não responde, os círculos mostram a inicial; depois, a foto ou o avatar.
    carregarAvatarMenu();
}

// Busca o avatar e a foto da pessoa no servidor e mostra nos dois círculos do menu da conta.
function carregarAvatarMenu() {
    fetch(`/usuarios/perfil/${sessionStorage.ID_USUARIO}`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (perfil) {
            mostrarAvatarMenu(document.getElementById("inicial_usuario_header"), perfil);
            mostrarAvatarMenu(document.getElementById("inicial_menu_conta"), perfil);
        })
        .catch(function (erro) {
            // se der erro, o menu continua com a inicial do nome
            console.log(erro);
        });
}

// Coloca no círculo a foto (se tiver), a imagem do avatar ou deixa a inicial do nome.
function mostrarAvatarMenu(circulo, perfil) {
    var imagem = document.createElement("img");

    if (perfil.foto_usuario != null) {
        // .src recebe o texto da foto sem passar pelo HTML (mais seguro que innerHTML)
        imagem.src = perfil.foto_usuario;
        imagem.alt = "Sua foto";
    } else if (perfil.avatar_usuario != "inicial") {
        imagem.src = `./assets/img/avatares/${perfil.avatar_usuario}.png`;
        imagem.alt = "Seu avatar";
    } else {
        return;
    }

    circulo.textContent = "";
    circulo.appendChild(imagem);
}

// Abre e fecha o menu da conta (o mesmo botão faz as duas coisas).
function abrirMenuConta() {
    document.getElementById("menu_conta_caixa").classList.toggle("aberto");
    document.getElementById("btn_menu_conta").classList.toggle("aberto");
}

function sair() {
    sessionStorage.clear();
    window.location = "./login.html";
}

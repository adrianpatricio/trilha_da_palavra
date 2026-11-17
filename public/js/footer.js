var footer = document.getElementById("footer");

var linksContaFooter = `
    <a href="./login.html">Entrar</a>
    <a href="./cadastro.html">Criar conta</a>
`;

// usuário logado
if (sessionStorage.NOME_USUARIO != undefined) {
    linksContaFooter = `
        <a href="./biblia.html">Bíblia</a>
        <a href="./dashboard.html">Progresso</a>
        <a href="#" onclick="sair()">Sair</a>
    `;
}

footer.innerHTML = `
    <section class="container_footer">
        <section class="container_info">
            <section class="section_sobre">
                <p class="titulo_sobre">Trilha da Palavra</p>

                <p class="descricao_sobre">Um caminho para percorrer a Bíblia, capítulo a capítulo, acompanhando o seu progresso.</p>
            </section>

            <section class="container_colunas">
                <section class="coluna_footer">
                    <p class="titulo_coluna">O PROJETO</p>

                    <a href="./sobre.html">Sobre o projeto</a>
                    <a href="#">Explicações</a>
                </section>

                <section class="coluna_footer">
                    <p class="titulo_coluna">SUA CONTA</p>

                    ${linksContaFooter}
                </section>
            </section>
        </section>

        <section class="section_referencias">
            <p>Projeto Individual · São Paulo Tech School</p>

            <a href="#top" class="voltar_topo">↑ Voltar ao topo</a>
        </section>
    </section>
`;

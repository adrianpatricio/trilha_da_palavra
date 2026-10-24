var footer = document.getElementById('footer');

footer.innerHTML = `
    <section class="container_footer">
        <section class="container_info">
            <section class="section_sobre">
                <a href="./index.html">
                   <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.625 27.1875V13.5938C5.625 11.1073 6.61272 8.72278 8.37087 6.96462C10.129 5.20647 12.5136 4.21875 15 4.21875C17.4864 4.21875 19.871 5.20647 21.6291 6.96462C23.3873 8.72278 24.375 11.1073 24.375 13.5938V27.1875" stroke="#1D3328" stroke-width="1.875" stroke-linecap="round"/>
                    <path d="M11.7188 27.1875C11.7188 24 18.2812 23.25 18.2812 19.5C18.2812 16.6875 14.9062 16.125 14.9062 13.5938C14.9062 12.375 15.6562 11.4375 16.7812 10.7812" stroke="#A3683F" stroke-width="2.0625" stroke-linecap="round"/>
                </svg>

                    <p>Trilha da Palavra</p>
                </a>

                <p class="descricao_sobre">Um caminho para percorrer a Bíblia, capítulo a capítulo, acompanhando o seu progresso.</p>
            </section>

            <section class="section_projeto">
                <p>O PROJETO</p>

                <a href="#">Sobre o projeto</a>

                <a href="#">Explicações</a>
            </section>

            <section class="section_conta">
                <p>SUA CONTA</p>

                <a href="./login.html">Entrar</a>

                <a href="./cadastro.html">Criar conta</a>
            </section>
        </section>

        <span class="divisor_footer"></span>

        <section class="section_referencias">
            <p>Projeto Individual · São Paulo Tech School</p>

            <a href="#top" class="voltar_topo">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.1562 5.90625L5.90625 0.65625L0.65625 5.90625M5.90625 0.65625V11.1562" stroke="currentColor" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                Voltar ao topo
            </a>
        </section>
    </section>
`;

var atual = footer.querySelector('[data-link="' + footer.dataset.pagina + '"]');

if (atual) atual.classList.add('agora');
var header = document.getElementById('header');

header.innerHTML = `
    <section class="section_logo">
        <img src="./assets/img/logo.png">

        <p>Trilha da Palavra</p>
    </section>

    <nav class="nav_links">
        <ul>
            <li class="li text">
                <a href="./index.html">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 21V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12H10C9.73478 12 9.48043 12.1054 9.29289 12.2929C9.10536 12.4804 9 12.7348 9 13V21" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 10C2.99993 9.70907 3.06333 9.42162 3.18579 9.15771C3.30824 8.89381 3.4868 8.65979 3.709 8.472L10.709 2.473C11.07 2.16791 11.5274 2.00052 12 2.00052C12.4726 2.00052 12.93 2.16791 13.291 2.473L20.291 8.472C20.5132 8.65979 20.6918 8.89381 20.8142 9.15771C20.9367 9.42162 21.0001 9.70907 21 10V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V10Z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    Início
                </a>
            </li>

            <li class="li text">
                <a href="#">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    Explicações
                </a>
            </li>

            <li class="li text">
                <a href="#">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>


                    Sobre o projeto
                </a>
            </li>

            <span class="span_divisor"></span>

            <li class="li text">
                <a href="./login.html">
                    Entrar
                </a>
            </li>

            <li class="login text">
                <a href="#">
                    Criar conta
                </a>
            </li>

            <li class="text">
                <img src="">
            </li>
        </ul>
    </nav>
`;

var atual = header.querySelector('[data-link="' + header.dataset.pagina + '"]');

if (atual) atual.classList.add('agora');
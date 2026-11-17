# AGENTS.md

## Regras obrigatórias

- Este arquivo deve ser seguido ao pé da letra, em todas as tarefas, sem exceções.
- Nenhuma regra pode ser ignorada, adaptada ou "melhorada" por conta própria.
- Se um pedido meu entrar em conflito com alguma regra, pare e me pergunte antes de agir.
- Se algo não estiver claro, pergunte; não suponha.
- Antes de cada resposta, confira se ela segue todas as regras deste arquivo.

---

## 1. Contexto

- **Trilha da Palavra** é um projeto individual da SPTech, feito no 1º semestre de Análise e Desenvolvimento de Sistemas (ADS).
- É um site de leitura bíblica. A pessoa cria uma conta, marca cada capítulo que leu e acompanha o seu progresso, de Gênesis a Apocalipse.
- **Referência de design (versão final):** `C:\Users\adria\OneDrive\Desktop\trilha_v3`
  - `01_inicio.png` a `16_admin_novo.png`: as telas do site.
  - `tabela_de_cores.md`: as cores do site, com o nome de cada uma e onde ela é usada.
  - As fontes, os tamanhos, os espaçamentos e as bordas seguem o `guia_de_estilo.md` (`C:\Users\adria\OneDrive\Desktop\trilha_v2_design`), como diz a própria `tabela_de_cores.md`. Do v2, só as cores foram trocadas.

---

## 2. Estrutura e estilo

### Tecnologias permitidas
Use **apenas**:
- HTML
- CSS
- JavaScript puro
- Node.js com Express
- MySQL

Tudo no nível do 1º semestre: nada de frameworks, TypeScript, bibliotecas novas ou recursos avançados.
A única biblioteca externa já usada no front-end é o **Chart.js** (com o plugin datalabels), na página `dashboard.html`.

### Como rodar o projeto
O projeto segue o padrão do web-data-viz:
- Instalar as dependências: `npm install`
- Rodar: `npm start` (ou `npm run dev`, com nodemon)
- As configurações ficam no arquivo `.env.dev`: `APP_PORT`, `APP_HOST`, `DB_HOST`, `DB_DATABASE`, `DB_USER`, `DB_PASSWORD`, `DB_PORT` e `AMBIENTE_PROCESSO`.
- O ambiente é escolhido nas duas primeiras linhas do `app.js`.
- O banco é criado pelo `src/database/script-tabelas.sql`.

### Estrutura do repositório
Segue o padrão do web-data-viz (https://github.com/BandTec/web-data-viz). **Não mude essa estrutura.**

```
app.js                    -> inicia o Express e liga cada rota (app.use("/usuarios", usuarioRouter))
public/                   -> front-end (o que o navegador abre)
  *.html                  -> uma página por arquivo, na raiz de public (index, login, cadastro, biblia, dashboard, sobre)
  css/                    -> estilo.css (base de todas as páginas), header.css, footer.css e um CSS por página
  js/                     -> header.js e footer.js (montam o cabeçalho e o rodapé), sessao.js (funções comuns)
  assets/img/             -> imagens
src/
  routes/                 -> recebem a requisição e chamam o controller (index.js, usuarios.js, leituras.js)
  controllers/            -> pegam os dados, validam e chamam o model (usuarioController.js, leituraController.js)
  models/                 -> montam a instrução SQL e chamam database.executar (usuarioModel.js, leituraModel.js)
  database/config.js      -> conexão com o MySQL e a função executar(instrucao, valores)
  database/script-tabelas.sql -> criação das tabelas e dados iniciais
```

### Caminho de uma requisição
1. **HTML:** uma função JavaScript da página (ex.: `entrar()`) pega os valores dos campos e faz `fetch("/usuarios/autenticar", { method: "POST", ... })`, mandando o corpo em JSON com chaves terminadas em `Server` (ex.: `emailServer`).
2. **Route** (`src/routes/usuarios.js`): `router.post("/autenticar", function (req, res) { usuarioController.autenticar(req, res); });`
3. **Controller:** lê `req.body.emailServer` ou `req.params.idUsuario`, valida e chama o model.
4. **Model:** monta a instrução SQL com `?` e chama `database.executar(instrucaoSql, [valores])`.
5. **Resposta:** o controller responde com `res.status(...).json(...)` ou `.send("mensagem")`, e o HTML trata a resposta em `.then(function (resposta) { ... })`.

Uma funcionalidade nova passa por esses mesmos arquivos e nessa ordem: rota no `app.js` (se for um grupo novo), arquivo em `routes`, função no controller, função no model e chamada no HTML.

### Meu estilo de código

**Geral**
- Indentação de **4 espaços** em HTML, CSS e JavaScript.
- Nomes de funções, variáveis, mensagens e comentários **em português**.
- Comentários curtos, em linha própria, acima do bloco que explicam. Exemplos: `// Próxima leitura = o primeiro capítulo ainda não lido, na ordem da Bíblia.` e `// sessão`.
- Uma linha em branco separando blocos de código.

**JavaScript (front-end e back-end)**
- Variáveis com `var` (o projeto e o web-data-viz usam `var`).
- Funções declaradas com `function nome() { }`. Callbacks também com `function (...) { }`, não com arrow function.
- Promessas com `.then(function (resultado) { ... })` e `.catch(function (erro) { ... })`.
- Nomes de funções em **camelCase**, começando com verbo: `cadastrar`, `autenticar`, `listarLivros`, `buscarProgresso`, `marcarLivro`, `calcularProxima`.
- Variáveis em **camelCase**: `idUsuario`, `livroFavorito`, `capitulosLidos`.
- No HTML, as variáveis que vêm de campos terminam em `Var` (`emailVar`, `senhaVar`), e as chaves enviadas ao servidor terminam em `Server` (`emailServer`, `idUsuarioServer`).
- Strings com aspas duplas (`"..."`), que é o mais usado no projeto. Template string (`` `...` ``) só para SQL e para HTML montado no JavaScript.
- Comparações com `==`, como no código atual.
- Cada arquivo de routes, controllers e models termina com `module.exports = { funcao1, funcao2 };` (nas routes, `module.exports = router;`).

**Controllers**
- Pegam os dados no começo da função: `var email = req.body.emailServer;`.
- Validam com `if / else if` e respondem com `res.status(400).send("Mensagem para o usuário.");`.
- Usam os códigos 200, 201, 400, 401, 404, 409 e 500, como no código atual.
- Registram erros assim: `console.log("\nHouve um erro ao <ação>! Erro: ", erro.sqlMessage);` e depois `res.status(500).json(erro.sqlMessage);`.

**Models**
- Começam com `var database = require("../database/config")`.
- Uma função por consulta, com `var instrucaoSql = ` em template string, valores sempre por `?` (nunca colados no texto do SQL), `console.log("Executando a instrução SQL: \n" + instrucaoSql);` e `return database.executar(instrucaoSql, [valores]);`.

**Banco de dados (MySQL)**
- Tabelas no singular e minúsculas: `usuario`, `livro`, `leitura`.
- Colunas em snake_case, com o nome da tabela no final: `id_usuario`, `nome_usuario`, `email_usuario`.
- Chaves estrangeiras começam com `fk_` (`fk_usuario`, `fk_livro_favorito`).
- Constraints com prefixo: `ch_` (CHECK), `uq_` (UNIQUE), `fk_` (FOREIGN KEY).

**HTML**
- `lang="pt-br"` e o título no formato `Página - Trilha da Palavra`.
- O CSS é ligado nesta ordem: `estilo.css`, `header.css`, `footer.css` e depois o CSS da página.
- O cabeçalho e o rodapé são vazios no HTML (`<header id="header" data-pagina="...">` e `<footer id="footer" ...>`) e preenchidos por `js/header.js` e `js/footer.js`.
- Páginas que exigem login chamam `exigirLogin();` (de `sessao.js`) no `<head>`.
- O JavaScript próprio de cada página fica num `<script>` no fim do `<body>`.
- Os dados do usuário logado ficam no `sessionStorage`: `ID_USUARIO`, `NOME_USUARIO`, `EMAIL_USUARIO` e `TIPO_USUARIO`.
- `id` em snake_case com prefixo pelo tipo: `ipt_` (input), `btn_` (botão), `erro_` (mensagem de erro de um campo), `canvas_` (gráfico), `kpi_` (indicador). Exemplos: `ipt_email`, `btn_marcar_livro`, `canvas_dias`.
- Eventos com `onclick="funcao()"` direto no HTML.

**CSS**
- Um arquivo por página. Os arquivos de página mais recentes (`login.css`, `biblia.css`, `dashboard.css`) começam com um comentário de título, como `/* LOGIN - LOGIN.HTML */`.
- Classes em snake_case, começando pela seção ou página: `section_login`, `dash_titulo`, `botao_entrar`, `top_progresso`.
- **Cores, fontes e espaçamentos sempre por variáveis CSS** (`var(--nome)`), declaradas no `:root` de `estilo.css` e com os valores do trilha_v3. Não escrever cor HEX, nome de fonte ou espaçamento direto nas regras.

---

## 3. Forma de trabalhar (tutor)

- Explique **passo a passo** e em **linguagem simples**, para quem está no 1º semestre.
- Em cada passo, pergunte: **"Quer implementar você mesmo ou prefere que eu faça?"**
- Se eu for fazer, dê **pistas** e aponte os **erros** sem reescrever tudo por mim.
- **Peça permissão antes de alterar qualquer arquivo.**
- **Não implemente nada que eu não pedi.**
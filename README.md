# @pipelinesolucoes/menu

Biblioteca de **componentes de menu para React**, desenvolvida para **padronização visual**, **reutilização** e **escalabilidade** em aplicações modernas e design systems.

Este pacote faz parte do ecossistema de componentes da **Pipeline Soluções**.

---

## 📦 Componentes disponíveis

A biblioteca inclui os seguintes componentes:

- **BarraFerramentas** 
  Componente que renderiza uma barra de ferramentas (Toolbar) do Material UI com layout em grid
  dividido em três áreas: esquerda, meio e direita. Cada área é renderizada via funções
  `renderLeft`, `renderMiddle` e `renderRigth`.

- **ItemMenu** 
  Componente de item de menu baseado em `<a>` estilizado via Material UI `styled`.
  Renderiza um link com aparência de **botão** ou **link**, aplicando estilos de fundo, texto, borda e hover, além de suportar comportamento de **scroll suave** para âncoras.

- **MenuHamburguer** 
  Componente de menu hamburguer responsivo que exibe um `IconButton` e, ao clicar, abre um `Menu` do Material UI contendo itens configuráveis via `listaItemMenu`. 

- **MenuHorizontal**
  Componente de menu horizontal que renderiza uma lista de itens de menu lado a lado utilizando `flexbox`.

- **MenuVertical**
  Componente de menu vertical que renderiza uma lista de itens de menu empilhados em coluna utilizando `flexbox`.

- **SideNav**
  Componente de navegação lateral com área de conteúdo associada.
  Permite alternar entre diferentes seções de conteúdo através de um menu vertical. 
  Cada item do menu pode possuir um conteúdo associado que será exibido na área principal ao ser selecionado.

- **DrawerResponsive**
  DrawerResponsive é um layout de navegação responsivo que:
  - Em telas pequenas (xs/sm) usa o `MobileMiniDrawerLayout` (header + bottom navigation);
  - Em telas médias ou maiores (md+) usa o `DesktopMiniDrawerLayout` (AppBar + Drawer). 

---

## ✨ Características

- ✅ Pronto para produção
- 🎨 Integração com Material UI
- ♿ Foco em acessibilidade
- 🧩 Ideal para design systems
- 🔄 Reutilizável em múltiplos projetos
- 📦 Publicado no npm com versionamento semântico
- 🔐 Preparado para licenciamento por projeto

---

## 📥 Instalação

```bash
npm install @pipelinesolucoes/menu 
ou
yarn add @pipelinesolucoes/menu

```

## 🚀 Uso básico

```

```

## 🧩 Uso em Design Systems

Este pacote foi projetado para:

 - padronização de ações e navegação
 - reutilização entre projetos
 - evolução incremental de UI
 - integração com temas e tokens de design

Pode ser utilizado de forma isolada ou como parte de um design system maior.

---

## 🔐 Licença de uso comercial

Este pacote é publicamente acessível no npm, porém:

O uso comercial é licenciado por projeto.

**O que isso significa?**

O pacote pode ser instalado e avaliado livremente.

Para uso em projetos comerciais, é necessária a aquisição de uma licença válida por projeto.

**Definição de projeto**

Projeto = 1 aplicação em produção
(ex.: site institucional, sistema interno ou aplicação SaaS).
Ambientes de desenvolvimento, staging e homologação estão incluídos no mesmo projeto.

---

## 📄 O que a licença inclui

✔ Uso em 1 projeto
✔ Atualizações enquanto a licença estiver ativa
✔ Correções de bugs
✔ Suporte básico
✔ Evolução contínua do pacote

---

## ⚙️ Configuração de licença (mock)

Após adquirir a licença, você receberá um Project ID e uma License Key.

No projeto, configure as variáveis de ambiente:

PIPESOL_PROJECT_ID=meu-projeto
PIPESOL_menu_LICENSE_KEY=SUA-LICENSE-KEY-AQUI


Atualmente, a validação é local e não bloqueante, servindo como preparação para automação futura.

---

## 🔁 Versionamento

Este projeto segue Semantic Versioning (SemVer):

1.0.1 – Correção de bugs

1.1.0 – Nova funcionalidade compatível

2.0.0 – Mudança incompatível

1.0.0-beta.x – Versões beta

Para listar as versões publicadas:

```
npm view @pipelinesolucoes/menu versions --json
```

## 🚀 Processo de publicação

Este pacote é publicado exclusivamente via CI/CD utilizando GitHub Actions.

Características do processo:

 - Publicação apenas por tags Git (vX.Y.Z)
 - Autenticação via Trusted Publishing (OIDC)
 - Nenhum token npm armazenado
 - Tokens clássicos desabilitados
 - Autenticação em dois fatores (2FA) obrigatória
 - Publicações seguras, rastreáveis e reprodutíveis

 ---

 ## 📬 Aquisição de licença e contato

Para adquirir uma licença comercial ou obter mais informações:

📧 contato@pipelinesolucoes.com.br
🌐 https://www.pipelinesolucoes.com.br

--- 

## 📄 Licença

Copyright © Pipeline Soluções
Este software está sujeito a licença comercial por projeto.
Consulte o arquivo LICENSE para mais informações.

```
Se você quiser, eu também posso gerar agora o **arquivo `LICENSE`** (texto curto e claro) no mesmo padrão profissional pra você copiar e colar como `LICENSE` no repo.
```



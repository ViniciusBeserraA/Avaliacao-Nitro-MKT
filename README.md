# Projeto ReactJS com Axios e Tailwind CSS

Este projeto é consite no desenvolvimento aplicativo ReactJS com Typescript (formulário de cadastro), que utiliza Axios para fazer requisições HTTP e Tailwind CSS para estilização rápida e eficiente. O projeto realiza requisições para um servidor PHP que está rodando em Docker na máquina local.

## Pré-Requisitos

Antes de começar, verifique se o seu ambiente atende aos seguintes requisitos:

- Node.js (versão 12 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Docker (opcional, para execução de ambientes locais)

## Tecnologias Utilizadas

- React.js ![React](https://img.shields.io/badge/-React-%2361DAFB?logo=react&logoColor=white&style=flat)
- Tailwind CSS ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-%2338B2AC?logo=tailwind-css&logoColor=white&style=flat)
- Axios ![Axios](https://img.shields.io/badge/-Axios-%23239AD6?logo=axios&logoColor=white&style=flat)
- PHP ![PHP](https://img.shields.io/badge/-PHP-%23777BB4?logo=php&logoColor=white&style=flat)
- Docker ![Docker](https://img.shields.io/badge/-Docker-%232496ED?logo=docker&logoColor=white&style=flat)

## Instalação

Para instalar e executar o projeto localmente, siga estes passos:

1. Clone o repositório: `git clone https://github.com/ViniciusBeserraA/Avaliacao-Nitro-MKT/seu-projeto.git`
2. Entre no diretório do projeto: `reactJs`
3. Instale as dependências: `npm install`

## Executando o Projeto

Para iniciar o projeto, execute o seguinte comando:

```bash
npm start

Estrutura do Projeto
A estrutura do projeto é organizada da seguinte forma:
```bash 
csharp
Copiar código
├── public/            # Arquivos públicos do projeto
├── src/               # Código fonte do projeto ReactJS
│   ├── api/           # Arquivos para requisicao   
│   ├── utils/         # Arquivos de validadores, conversores, etc..,
│   │     validators/  # Arquivos para validacao   
│   ├── utils/         # Arquivos para requisicao   
│   ├── index.tsx      # Ponto de entrada da aplicação
│   ├── index.css      # Estilizacao Global
├── package.json       # Metadados do projeto e dependências
└── README.md          # Este arquivo
```
## Atenção para o seguinte detalhe ao executar a aplicação:

Antes de iniciar a requisicoes desse projeto, verifique se o arquivo php, no qual que esteja rodando, possua as seguintes linhas header:
```javascript
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, x-api-key');
header('Access-Control-Allow-Credentials: true');
```
Essa alteração permite que aplicação funcione sem que ocorra o erro de CORS.

Para executar o projeto, usar o seguinte comando:

```bash 
npm run start
```


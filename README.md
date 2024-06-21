# Projeto ReactJS com Axios e Tailwind CSS:

Este projeto é consite no desenvolvimento aplicativo ReactJS com Typescript (formulário de cadastro), que utiliza Axios para fazer requisições HTTP e Tailwind CSS para estilização rápida e eficiente. O projeto realiza requisições para um servidor PHP que está rodando em Docker na máquina local.

## Pré-Requisitos:

Antes de começar, verifique se o seu ambiente atende aos seguintes requisitos:

- Node.js (versão 12 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Docker (opcional, para execução de ambientes locais)

## Tecnologias Utilizadas:

- React.js ![React](https://img.shields.io/badge/-React-%2361DAFB?logo=react&logoColor=white&style=flat)
- Tailwind CSS ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-%2338B2AC?logo=tailwind-css&logoColor=white&style=flat)
- Axios ![Axios](https://img.shields.io/badge/-Axios-%23239AD6?logo=axios&logoColor=white&style=flat)
- PHP ![PHP](https://img.shields.io/badge/-PHP-%23777BB4?logo=php&logoColor=white&style=flat)
- Docker ![Docker](https://img.shields.io/badge/-Docker-%232496ED?logo=docker&logoColor=white&style=flat)

# Estrutura do Projeto:
A estrutura do projeto é organizada da seguinte forma:
```bash 
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

## Instalação:

Para instalar e executar o projeto localmente, siga estes passos:

1. Clone o repositório: `git clone https://github.com/ViniciusBeserraA/Avaliacao-Nitro-MKT.git`
2. Entre no diretório do projeto: `reactJs`
3. Instale as dependências: `npm install`

## Atenção para o seguinte detalhe ao executar a aplicação:

Antes de iniciar a requisicoes desse projeto, verifique se o arquivo php, no qual que esteja rodando, possua as seguintes linhas header:
```javascript
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, x-api-key');
header('Access-Control-Allow-Credentials: true');
```
Essa alteração permite que aplicação funcione sem que ocorra o erro de CORS.

## Como executar o servidor do back-end:
Para executar o servidor basta executar os seguintes comandos dentro da pasta _backend_
```
docker build --tag 'backend_teste_tecnico' .
```
```
docker run -p 8080:8080 backend_teste_tecnico
```

O servidor estará disponível no endereço ``http://localhost:8080``

## Como executar o projeto front-end: 
Para executar o projeto, usar o seguinte comando:

```bash 
npm run start
```

## Validação de Formulário:
Para garantir que os dados inseridos pelo usuário sejam corretos e atendam aos requisitos mínimos, o formulário também é validado no front-end. Abaixo estão as regras de validação para cada campo:

- **Nome:**
  - Obrigatório

- **Email:**
  - Obrigatório
  - Deve ser um e-mail válido (seguido do formato padrão de e-mail)

- **Senha:**
  - Obrigatório
  - Mínimo de 8 caracteres
  - Pelo menos 1 caractere minúsculo
  - Pelo menos 1 caractere maiúsculo
  - Pelo menos 1 numeral

- **Confirmação de senha:**
  - Obrigatório
  - Deve ser idêntico ao campo **Senha**


## Requisições ao backend:
Ao enviar a requisição o back-end fará a validação dos campos, caso algum campo não passe na validação receberá um erro 400 com o seguinte corpo:
```json
{
    "erro": true,
    "tipoErro": "CAMPO_INVALIDO",
    "nomeCampo": "<Nome do campo>"
}
```

Ao enviar a requisição o back-end com um email indisponível receberá um erro 400 com o seguinte corpo:
```json
{
    "erro": true,
    "tipoErro": "USUARIO_EXISTENTE"
}
```

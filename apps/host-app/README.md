This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# FIAP - Projeto Tech Challenger - Fase 1

I

Este projeto utiliza Next.js, Tailwind CSS e Prisma com SQLite como banco de dados.
Siga as instruções abaixo para executar o projeto.

## Requisitos

- [Node.js](https://nodejs.org/) (recomendado: versão LTS)

## Instalação

1. Clone o repositório para sua máquina local

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

## Configuração do Banco de Dados

Como o SQLite é um banco de dados baseado em arquivos, ele será automaticamente configurado ao rodar o comando de migração abaixo.

1. Execute as migrações para criar as tabelas no banco de dados:

   ```bash
   npx prisma migrate dev --name init
   ```

2. (Opcional) Para visualizar os dados do banco de dados, você pode utilizar o Prisma Studio:

   ```bash
   npx prisma studio
   ```

## Executando o Projeto

1. Inicie o servidor de desenvolvimento do Next.js:

   ```bash
   npm run dev
   ```

   O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

## Prisma

Prisma é usado para modelar e gerenciar o banco de dados. O esquema do banco de dados é definido em `prisma/schema.prisma`. Após qualquer alteração no esquema, você deve gerar novamente o cliente do Prisma:

```bash
npx prisma generate
```

## Storybook

Storybook é uma ferramenta para desenvolvimento isolado e documentação de componentes UI. Ele ajuda a visualizar e testar componentes de forma independente, o que facilita o desenvolvimento de interfaces mais robustas e reutilizáveis.

Para rodar o Storybook no projeto, utilize o comando:

```bash
npm run storybook
```

Isso abrirá o Storybook no navegador, geralmente em [http://localhost:6006](http://localhost:6006), onde você poderá explorar os componentes disponíveis e interagir com suas variações.

# Projeto Microfrontend com Module Federation e Docker

Aplicativo Host Next.js
Aplicativo Remoto Angular
Banco de Dados Postgres

## Estrutura do Projeto

- **apps/host-app**: Contém o aplicativo host.
- **apps/remote-app**: Contém o aplicativo remoto para os investimentos.
- **libs/db**: Contém os esquemas e a configuração do Prisma.
- **Docker**: Contém os arquivos de configuração do Docker Compose.

---

### Comandos úteis

- Criar migration

```bash
npx prisma migrate dev --name <migration_name> --schema=./libs/db/prisma/schema.prisma
```

## Inicialização para apenas rodar o projeto

### 1. Iniciar Containers

Certifique-se de que o Docker esteja instalado e em execução no seu sistema.
Execute o comando abaixo para iniciar todos os serviços definidos em `./Docker/docker-compose.yml`.

```bash
npm run up-all
```

### 2. Acessar aplicação host

Acesse a aplicação host na url em [http://localhost:3000](http://localhost:3000).

---

## Inicialização para desenvolver

### 1. Instalar dependências

Antes de qualquer coisa, instale as dependências da raiz, host-app e remote-app.

```bash
npm install
```

---

### 2. Iniciar Banco de dados

Certifique-se de que o Docker esteja instalado e em execução no seu sistema.

#### Suba o container do Docker:

Execute o comando abaixo para iniciar o banco de dados definido em `./Docker/Dockerfile-Postgres`.

```bash
npm run up-db
```

---

### 3. Configurar e Inicializar o Prisma

#### Navegue até a pasta do Prisma:

```bash
cd libs/db
```

#### 3.1 Gerar os arquivos do Prisma:

Certifique-se de que as migrações e o cliente Prisma estejam configurados corretamente.

```bash
npx prisma generate --schema=./libs/db/prisma/schema.prisma
```

#### 3.2 Aplicar as migrações no banco de dados:

```bash
npx prisma migrate dev --schema=./libs/db/prisma/schema.prisma
```

Se o banco de dados estiver configurado corretamente, as migrações serão aplicadas.

#### 3.3 Verificar o banco de dados:

Para abrir o Prisma Studio e visualizar os dados:

```bash
npx prisma studio --schema=./libs/db/prisma/schema.prisma
```

---

### 4. Iniciar o Aplicativo Host

Depois de configurar o ambiente, inicie o aplicativo host:

#### Navegue até a pasta do host-app:

```bash
cd apps/host-app
```

#### Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor será iniciado e estará disponível em [http://localhost:3000](http://localhost:3000).

---

### 5. Iniciar o Aplicativo Remoto

Depois de configurar o ambiente, inicie o aplicativo remoto:

#### Navegue até a pasta do remote-app:

```bash
cd apps/remote-app
```

#### Inicie o servidor

- Desenvolvimento:

```bash
npm run dev
```

- Produção:

```bash
npm run serve
```

O servidor será iniciado e estará disponível em [http://localhost:3002](http://localhost:3002).

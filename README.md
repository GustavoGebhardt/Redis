# Projeto de Autenticação com Cache usando Redis

Este projeto implementa um sistema de autenticação utilizando **JWT** e **Redis** para cache. O objetivo é otimizar o desempenho e a segurança ao lidar com autenticação, armazenando dados temporários de usuários e tokens no Redis.

## 🚀 Funcionalidades

- **Autenticação JWT**: Geração e validação de tokens.
- **Cache com Redis**:
  - Armazenamento temporário de usuários autenticados.
  - Validação de tokens utilizando o cache para reduzir consultas ao banco de dados principal.
- **Middleware de validação**: Protege rotas garantindo que apenas usuários autenticados tenham acesso.
- **Logs de erros**: Registro de falhas para depuração.

## 🛠️ Tecnologias

- **Node.js**
- **Express**
- **Prisma** (ORM para o banco de dados)
- **Redis** (Cache)
- **JWT** (JSON Web Tokens para autenticação)
- **TypeScript** (para tipagem estática e melhor desenvolvimento)

## 🏗️ Estrutura do Projeto

```
📂 prisma              # Arquivos do Prisma ORM (esquema e cliente)
📂 src
├── 📂 config          # Configurações do Redis e JWT
├── 📂 controllers     # Lógica das rotas (ex: autenticação, criação de usuário)
├── 📂 helpers         # Funções auxiliares (ex: logs, hash de senha)
├── 📂 middlewares     # Middlewares de autenticação e validação
├── server.ts          # Ponto de entrada do servidor
└── app.ts             # Ponto de entrada do servidor
```

## ⚙️ Instalação e Configuração

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/GustavoGebhardt/Redis
   cd Redis
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   DATABASE_URL=postgresql://seuusuario:suasenha@localhost:5432/seubanco
   REDIS_URL=redis://localhost:6379
   AUTH_SECRET=sua_chave_secreta
   AUTH_EXPIRESIN=1h
   PORT=3000
   ```

4. **Inicie o Redis** (se ainda não estiver em execução):
   ```bash
   redis-server
   ```

5. **Execute as migrações do banco**:
   ```bash
   npx prisma migrate dev
   ```

6. **Compilar arquvios**:
   ```bash
   npm run build
   ```

7. **Inicie o servidor**:
   ```bash
   npm run start
   ```

## 🚦 Uso

### Rotas principais:

- **POST /user**  
  Cria um novo usuário.
  ```json
  {
    "email": "exemplo@email.com",
    "password": "sua_senha",
    "username": "seu_usuario"
  }
  ```

- **POST /session**  
  Autentica o usuário e retorna um token JWT.
  ```json
  {
    "email": "exemplo@email.com",
    "password": "sua_senha"
  }
  ```

- **DELETE /user**  
  Rota protegida por middleware de autenticação.

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---
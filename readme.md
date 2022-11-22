# Setup do projeto

### Instalando dependências

1. Caso nao tenha ainda, instale o [NodeJs](https://nodejs.org/en/download/)
2. Baixe o [Oracle Instant Client](https://www.oracle.com/database/technologies/appdev/quickstartnodejs.html). Pegue o zip do arquivo e extraia-o em alguma pasta (eu coloquei o meu em `C:/oracle/instantclient_21_7`, por exemplo)
3. Dentro dos arquivos extraidos, existe a pasta `network/admin`, entre nela e extraia o arquivo `Wallet_BDENGCOMP.zip` do Banco de Dados do professor (se precisarem podem me pedir que eu mando pra vcs)

### Rodando o Codigo

4. Clone o projeto, abra o terminal e execute o comando npm install para instalar as dependencias
5. No arquivo `.env.development`, localizado na raiz do projeto, coloque suas credenciais no banco de dados e o caminho onde encontra-se a biblioteca do **passo 2**
6. renomeie o arquivo `.env.development` para `.env`
7. Rode o projeto com o comando `node index.js`
8. Prontinho, o projeto esta configurado ! :3

# Documentação

Este projeto utiliza duas principais dependencias:

- expressJs: Framework para o desenvolvimento de APIs e aplicacoes backend
- oracledb: Biblioteca de integracao da Oracle com o NodeJs

O projeto possui a seguinte estrutura

- **./routes/\*** : Armazena as queries e rotas que vamos criar, basicamente é o lugar onde vamos trabalhar 80% do tempo
- **./.env.development** : Informações pessoais e de caminhos que vamos utilizar (deve ser renomeado para `.env`)
- **./credentials.js** : credenciais do banco de dados, basicamente puxa informacoes do arquivo `.env`
- **./db.js** : definicao do codigo de execucao de queries
- **./index.js** : ponto de entrada do programa, basicamente define as URLs basicas de cada conjunto de rotas definidas e define a porta na qual o backende opera
- **./ref.js** : script de referencias que usei para comecar a definir a estrutura, atualmente nao faz nada no programa e posteriormente vai ser deletado :D

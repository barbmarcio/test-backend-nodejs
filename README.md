<h1>Informações úteis</h1>

Desenvolvido em TypeScript utilizando TypeORM e usando banco de dados postgres através do docker
Deixei todas as informações para acesso ao banco fora de arquivo ENV para que seja possível a alteração na hora de testarem.
As informações do banco estão no arquivo "ormconfig" localizado na raiz.
As requisições foram feitas utilizando Insomnia para testes

Para teste então, é necessário:

1 - Instalação do docker: https://www.docker.com/products/docker-desktop

2 - Criação do container utilizando o seguinte comando via terminal:
"docker run --name assessment -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

3 - Com o docker instalado, iniciado e o container criado, abra o docker e inicie o container clicando no botão de play;

4 - Abra o projeto e digite no terminal "yarn m:run" - Para que as migrations feitas sejam executadas para criação das tabelas no banco

5 - Digite no terminal "yarn dev:server". Tudo deve estar funcionando perfeitamente.

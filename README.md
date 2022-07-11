# CoreLab API Challenge

Este é um desafio backend concluído proposto pela corelab. Foi proposto construir uma API Restful com as melhores práticas de desenvolvimento.

## Tecnologias utilizadas
- [Docker](https://www.docker.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Redis](https://redis.io/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [SuperTest](https://www.npmjs.com/package/supertest)
- [Tsyringe](https://www.npmjs.com/package/tsyringe)
- [Celebrate](https://www.npmjs.com/package/celebrate)

# Como rodar o projeto

Depois de clonar o repósitiorio no seu computador, é preciso instalar as dependências usando o [yarn](https://yarnpkg.com/) ou o [npm](https://www.npmjs.com/).

```bash
yarn
```
ou

```bash
npm install
```

## Varáveis de ambiente

Criar um arquivo nomeado ".env" e registrar as variaveis de ambiente descritas no arquivo de exemplo ".env.example"

Verificar as portas dos containers no "docker-compose.yml"

## Docker

Depois de instalar todas as dependências, é necessário criar a imagem e subir os containers. Para fazer isso você deve rodar o seguinte comando na raiz do projeto:

```javascript
docker-compose up -d
```

Para verificar o log da aplicação, rode este comando:

```javascript
docker logs corelab-challenge_api -f
```

## Testes

Para rodar os testes, deve-se entrar no terminal do container que está rodando a aplicação.

Para isso rode o seguinte comando:

```javascript
docker exec -it corelab-challenge_api /bin/bash
```

E então para rodar os testes, rode este comando:

```javascript
yarn test
```

## Link do vídeo de apresentação

Ao invés de utilizar um arquivo textual para explicar, para esclarecer melhor e poupar tempo dos recrutadores, resolvi gravar um vídeo mostrando como foi feito o back-end:

[https://www.loom.com/share/c8b022561ffd4b838fc9e35973658698](https://www.loom.com/share/c8b022561ffd4b838fc9e35973658698)

## License
[MIT](https://choosealicense.com/licenses/mit/)

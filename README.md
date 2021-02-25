<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

Esta aplicação foi desenvolvida utilizando o framework Nestjs com a finalidade de prover o serviço de encurtamento de urls. Foi utilizado o banco de dados postgresql para persistência de dados e redis.io para cache de consultas provendo um melhor desempenho de requests. Para rodar app e serviços externos foi feito uso do docker-compose.

A aplicação também está rodando em uma instância EC2 da AWS.

## Rodando o app com docker-compose

```bash
# development
$ docker-compose up


## Rodando os testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Exemplos Request / Response (Podem ser importados do arquivo url-nanica.postman_collection.json)

```bash
curl --location --request POST 'http://ec2-52-44-237-178.compute-1.amazonaws.com/short-url' \
--header 'Content-Type: application/json' \
--data-raw '{"url":"http://google.com","customerEmail":"reinaldo.padua@unoesc.edu.br"}'

{
    "newUrl": "http://ec2-52-44-237-178.compute-1.amazonaws.com/CDYpWPGgj",
    "expireAt": "2021-02-24T01:59:43.394Z"
}

```


```bash
curl --location --request POST 'localhost:3000/short-url' \
--header 'Content-Type: application/json' \
--data-raw '{"url":"http://gmail.com"}'

{
    "newUrl": "http://localhost:3000/DocpqdUkr",
    "expireAt": "2021-02-24T02:10:30.998Z"
}

```


## Melhorias futuras

Armazenar dados de redirect executados com finalidade de analise de dados futuras. 

Usar elasticsearch ou mongodb para armazenamento de logs.

Migrar de EC2 para uma arquitetura mais robusta (Api gateway + EBS + ECS usando cloud formation)

Build e deploy automatizado Travis, GitHub CI ou AWS Code Pipeline. 



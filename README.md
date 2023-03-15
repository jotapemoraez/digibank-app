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

## Description

This program was developed with the framework NestJs.
It implements a basic API in which accounts can be created with some information like firstName, lastName, balance.
It's also possible to execute transfer transactions between accounts, retrieve accounts and transactions related to an account.
In the big picture the architecture is composed by controllers, services  and models respecting NestJs standards.
Basically the controllers (AccountController and TransactionsController) implement the api and validation schemas.
The Services implement the main logic and the models holds all the data (sqlite database in this case).


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```


## Program Interoperability Example

## Create and Retrieve Accounts
1. Run npm install
2. Run npm start
3. Create two accounts with balance 400
4. Ex:
  curl --location --request POST 'http://localhost:8080/api/digibank/v1/account' \
--header 'Content-Type: application/json' \
--data-raw '{
   "firstName": "John",
   "lastName": "Paul",
   "balance": 400,
   "age": 36,
   "email": "xxx@gmail.com"
   }'

    curl --location --request POST 'http://localhost:8080/api/digibank/v1/account' \
--header 'Content-Type: application/json' \
--data-raw '{
   "firstName": "Ringo",
   "lastName": "Star",
   "balance": 400,
   "age": 36,
   "email": "yyy@gmail.com"
   }'

5. For both calls a 201 response should be returned with the created accounts

6. The accounts can be retrieved by calling:
  curl --location --request GET 'http://localhost:8080/api/digibank/v1/account/' \
  --header 'Content-Type: application/json' \
  --data-raw ''

7. Or only one single account by:
curl --location --request GET 'http://localhost:8080/api/digibank/v1/account/1' \
--header 'Content-Type: application/json' \
--data-raw ''


## Transfer Transactions
8. Assuming that that above accounts had 1 and 2 as id. This below call will execute a transfer between them:
curl --location --request POST 'http://localhost:8080/api/digibank/v1/transaction' \
--header 'Content-Type: application/json' \
--data-raw '{
   "sourceAccount": 1,
   "destinyAccount": 2,
   "amount": 50
   }'

9. Retrive all transactions
curl --location --request GET 'http://localhost:8080/api/digibank/v1/transaction/'

10. Retrive all transactions executed by one account (the param in this case is related to the sourceAccount id):
curl --location --request GET 'http://localhost:8080/api/digibank/v1/transaction/1'

11. It's possible to verify the balances are changed after transactions by calling the endpoint at "6
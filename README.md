# MyFormatter

A simple Javascript utility that helps you to display currency, zip code br, date and date time

# Install

```bash
npm install worldcode-formatters-br --save
```

# Basic Usage

```JS
import { brl } from "worldcode-formatters-br";

brl(123.223)
// => "R$ 123,22"
```

```JS
import { zip_code } from "worldcode-formatters-br";

zip_code(78008435, true)
// => "78008-435"

zip_code(78008435)
// => "78008435"
```

```JS
import { date_time, date } from "worldcode-formatters-br";

date_time("2023-09-15 21:19:20.909-04")
// => "15/09/2023 21:19:20"

date_time("2023-09-15 21:19:20.909-04")
// => "15/09/2023"

or

date_time("2023-09-15")
// => "15/09/2023"
```

# cpf-cnpj-validator

Valida e formata strings de CPF ou CNPJ.

[![npm][npm-image]][npm-url]

[npm-url]: https://www.npmjs.com/package/worldcode-formatters-br

### Requer:

Node `^8.0.0`.

### Instalação:

```
npm i cpf-cnpj-validator -S
```

### Uso:

:warning: **NOTE**: Os exemplos estão na versão es6, mas você pode está usando a sintaxe antiga como preferir.

```js
import { cpf } from "install worldcode-formatters-br";
// or const { cpf } = require('install worldcode-formatters-br');

// gera um número de cpf
const num = cpf.generate();
// #=> 25634428777

// verifica se é um número válido
cpf.isValid(num);
// #=> true

// formata o número gerado
cpf.format(num);
// #=> 256.344.287-77
```

:warning: **NOTE**: Os módulos de cpf e cnpj possuem métodos nomeados de forma igual diferindo se apenas os resultados.

```js
import { cnpj } from "install worldcode-formatters-br";
// or const { cnpj } = require('install worldcode-formatters-br');

// gera um número de cpnj
const num = cnpj.generate();
// #=> 58403919000106

// verifica se é um número válido
cnpj.isValid(num);
// #=> true

// formata o número gerado
cnpj.format(num);
// #=> 58.403.919/0001-06
```

Veja mais exemplos práticos consultando os testes para [CPF](./__tests__/cpf_cnpj/cpf.jest.js) e [CNPJ.](./__tests__/cpf_cnpj/cnpj.jest.js)

Maiores informações podem ser obtidas com os testes de [validação 1](./__tests__/cpf_cnpj/validators/validator.1.test.ts) e [validação 2](./__tests__/cpf_cnpj/validators/validator.2.test.ts).

### Tests

```shell
npm run jest
```

# License

[MIT](https://github.com/guilhermereis1/worldcode-formatters/blob/master/LICENSE)

# MyFormatter

A simple Javascript utility that helps you to display currency, zip code br, date and date time

# Install

```bash
npm install worldcode-formatters --save
```

# Basic Usage

```JS
import { brl } from "worldcode-formatters";

brl(123.223)
// => "R$ 123,22"
```

```JS
import { zip_code } from "worldcode-formatters";

zip_code(78008435, true)
// => "78008-435"

zip_code(78008435)
// => "78008435"
```

```JS
import { date_time, date } from "worldcode-formatters";

date_time("2023-09-15 21:19:20.909-04")
// => "15/09/2023 21:19:20"

date_time("2023-09-15 21:19:20.909-04")
// => "15/09/2023"

or

date_time("2023-09-15")
// => "15/09/2023"
```

# License

[MIT](https://github.com/guilhermereis1/worldcode-formatters/blob/master/LICENSE)

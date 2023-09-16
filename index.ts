import { brl } from "./core/currency/currency";
import { zip_code } from "./core/zip_code/zip_code";
import { date_time, date } from "./core/date/date";

console.log(brl(123.223));
console.log(brl("123.223"));
console.log(brl("12GS3.22a3"));

console.log(zip_code(78008435, true));
console.log(zip_code(78008435));

console.log(zip_code("78008435", true));
console.log(zip_code("78008435"));

console.log(zip_code("78008VVVV1435", true));
console.log(zip_code("z78008zzz435e"));

console.log(date_time("2023-09-15 21:19:20.909-04"));
console.log(date_time("2023-09-15 21:19:20"));
console.log(date("2023-09-15 21:19:20.909-04"));

import cheerio from "cheerio";
const request = require("request");
import { currencies, currencyCode } from "./currencies";

const CurrencyConverter = ({
  from,
  to,
  amount,
  isDecimalComma = false,
  isRatesCaching = false,
  ratesCacheDuration = 0,
}: any) => {
  let ratesCache: any = {};
  let convertedValue: any = 0;

  const from_currency = (currencyFrom: any) => {
    if (typeof currencyFrom !== "string")
      throw new TypeError("currency code should be a string");

    if (!currencyCode.includes(currencyFrom.toUpperCase()))
      throw new Error(`${currencyFrom} is not a valid currency code`);

    return currencyFrom.toUpperCase();
  };

  const to_currency = (currencyTo: any) => {
    if (typeof currencyTo !== "string")
      throw new TypeError("currency code should be a string");

    if (!currencyCode.includes(currencyTo.toUpperCase()))
      throw new Error(`${currencyTo} is not a valid currency code`);

    return currencyTo.toUpperCase();
  };

  const amount_currency = (currencyAmount: any) => {
    if (typeof currencyAmount !== "number")
      throw new TypeError("amount should be a number");
    if (currencyAmount <= 0)
      throw new Error("amount should be a positive number");

    return currencyAmount;
  };

  let from_value = from_currency(from);
  let to_value = to_currency(to);

  const setDecimalComma = (isDecimalComma: any) => {
    if (typeof isDecimalComma !== "boolean")
      throw new TypeError("isDecimalComma should be a boolean");

    return isDecimalComma;
  };

  const replaceAll = (text: any, queryString: any, replaceString: any) => {
    let text_ = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] === queryString) {
        text_ += replaceString;
      } else {
        text_ += text[i];
      }
    }
    return text_;
  };

  const setupRatesCache = (ratesCacheOptions: any) => {
    if (typeof ratesCacheOptions != "object")
      throw new TypeError("ratesCacheOptions should be an object");
    if (ratesCacheOptions.isRatesCaching === undefined)
      throw new Error(
        `ratesCacheOptions should have a property called isRatesCaching`
      );
    if (typeof ratesCacheOptions.isRatesCaching != "boolean")
      throw new TypeError(
        "ratesCacheOptions.isRatesCaching should be a boolean"
      );
    if (typeof ratesCacheOptions.ratesCacheDuration != "number")
      throw new TypeError(
        "ratesCacheOptions.ratesCacheDuration should be a number"
      );
    if (ratesCacheOptions.ratesCacheDuration <= 0)
      throw new Error(
        "ratesCacheOptions.ratesCacheDuration should be a positive number of seconds"
      );
    isRatesCaching = ratesCacheOptions.isRatesCaching;

    if (ratesCacheOptions.ratesCacheDuration === undefined)
      ratesCacheDuration = 3600; // Defaults to 3600 seconds (1 hour)
    else ratesCacheDuration = ratesCacheOptions.ratesCacheDuration;

    return ratesCacheDuration;
  };

  const rates = async () => {
    if (from_value === to_value) {
      return new Promise((resolve: any, _) => resolve(1));
    } else {
      let currencyPair = from_value.toUpperCase() + to_value.toUpperCase();
      let now = new Date();

      if (
        currencyPair in ratesCache &&
        now < ratesCache[currencyPair].expiryDate
      ) {
        return new Promise((resolve: any, _) => {
          resolve(ratesCache[currencyPair].rate);
        });
      } else {
        return new Promise((resolve: any, reject: any) => {
          request(
            `https://www.google.com/search?q=${from_value}+to+${to_value}+&hl=en`,
            function (error: any, response: any, body: any) {
              if (error) {
                return reject(error);
              } else {
                resolve(body);
              }
            }
          );
        })
          .then((body: any) => {
            return cheerio.load(body);
          })
          .then(($) => {
            return $(".iBp4i").text().split(" ")[0];
          })
          .then((rates) => {
            if (isDecimalComma) {
              if (rates.includes(".")) rates = replaceAll(rates, ".", "");
              if (rates.includes(",")) rates = replaceAll(rates, ",", ".");
            } else {
              if (rates.includes(",")) rates = replaceAll(rates, ",", "");
            }
            if (isRatesCaching) {
              addRateToRatesCache(currencyPair, parseFloat(rates));
            }
            return parseFloat(rates);
          });
      }
    }
  };

  const convert = async (currencyAmount: any) => {
    if (currencyAmount !== undefined) amount_currency(currencyAmount);

    if (from == "") throw new Error("currency code cannot be an empty string");

    if (to == "") throw new Error("currency code cannot be an empty string");

    if (amount == 0)
      throw new Error("currency amount should be a positive value");

    return await rates().then((rates: any) => {
      convertedValue = rates * currencyAmount;
      return convertedValue;
    });
  };

  const currencyName = (currencyCode_: any) => {
    if (typeof currencyCode_ != "string")
      throw new TypeError("currency code should be a string");
    if (!currencyCode.includes(currencyCode_.toUpperCase()))
      throw new Error(`${currencyCode_} is not a valid currency code`);

    return currencies[currencyCode_];
  };

  const addRateToRatesCache = (currencyPair: string, rate_: number) => {
    if (typeof currencyPair !== "string")
      throw new TypeError("currency pair should be a string");
    if (typeof rate_ !== "number")
      throw new TypeError("rate should be a number");
    let now = new Date();

    if (currencyPair in ratesCache) {
      if (now > ratesCache[currencyPair].expiryDate) {
        let newExpiry = new Date();
        newExpiry.setSeconds(newExpiry.getSeconds() + ratesCacheDuration);
        ratesCache[currencyPair] = {
          rate: rate_,
          expiryDate: newExpiry,
        };
      }
    } else {
      let newExpiry = new Date();
      newExpiry.setSeconds(newExpiry.getSeconds() + ratesCacheDuration);
      ratesCache[currencyPair] = {
        rate: rate_,
        expiryDate: newExpiry,
      };
    }
  };

  // convert(amount).then((res) => {
  //   console.log("####### C", res);
  //   return res;
  // });
};

export default CurrencyConverter;

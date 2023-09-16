"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = require("cheerio");
var request = require("request");
var currencies_1 = require("./currencies");
var CurrencyConverter = function (_a) {
    var from = _a.from, to = _a.to, amount = _a.amount, _b = _a.isDecimalComma, isDecimalComma = _b === void 0 ? false : _b, _c = _a.isRatesCaching, isRatesCaching = _c === void 0 ? false : _c, _d = _a.ratesCacheDuration, ratesCacheDuration = _d === void 0 ? 0 : _d;
    var ratesCache = {};
    var convertedValue = 0;
    var from_currency = function (currencyFrom) {
        if (typeof currencyFrom !== "string")
            throw new TypeError("currency code should be a string");
        if (!currencies_1.currencyCode.includes(currencyFrom.toUpperCase()))
            throw new Error("".concat(currencyFrom, " is not a valid currency code"));
        return currencyFrom.toUpperCase();
    };
    var to_currency = function (currencyTo) {
        if (typeof currencyTo !== "string")
            throw new TypeError("currency code should be a string");
        if (!currencies_1.currencyCode.includes(currencyTo.toUpperCase()))
            throw new Error("".concat(currencyTo, " is not a valid currency code"));
        return currencyTo.toUpperCase();
    };
    var amount_currency = function (currencyAmount) {
        if (typeof currencyAmount !== "number")
            throw new TypeError("amount should be a number");
        if (currencyAmount <= 0)
            throw new Error("amount should be a positive number");
        return currencyAmount;
    };
    var from_value = from_currency(from);
    var to_value = to_currency(to);
    var setDecimalComma = function (isDecimalComma) {
        if (typeof isDecimalComma !== "boolean")
            throw new TypeError("isDecimalComma should be a boolean");
        return isDecimalComma;
    };
    var replaceAll = function (text, queryString, replaceString) {
        var text_ = "";
        for (var i = 0; i < text.length; i++) {
            if (text[i] === queryString) {
                text_ += replaceString;
            }
            else {
                text_ += text[i];
            }
        }
        return text_;
    };
    var setupRatesCache = function (ratesCacheOptions) {
        if (typeof ratesCacheOptions != "object")
            throw new TypeError("ratesCacheOptions should be an object");
        if (ratesCacheOptions.isRatesCaching === undefined)
            throw new Error("ratesCacheOptions should have a property called isRatesCaching");
        if (typeof ratesCacheOptions.isRatesCaching != "boolean")
            throw new TypeError("ratesCacheOptions.isRatesCaching should be a boolean");
        if (typeof ratesCacheOptions.ratesCacheDuration != "number")
            throw new TypeError("ratesCacheOptions.ratesCacheDuration should be a number");
        if (ratesCacheOptions.ratesCacheDuration <= 0)
            throw new Error("ratesCacheOptions.ratesCacheDuration should be a positive number of seconds");
        isRatesCaching = ratesCacheOptions.isRatesCaching;
        if (ratesCacheOptions.ratesCacheDuration === undefined)
            ratesCacheDuration = 3600; // Defaults to 3600 seconds (1 hour)
        else
            ratesCacheDuration = ratesCacheOptions.ratesCacheDuration;
        return ratesCacheDuration;
    };
    var rates = function () { return __awaiter(void 0, void 0, void 0, function () {
        var currencyPair_1, now;
        return __generator(this, function (_a) {
            if (from_value === to_value) {
                return [2 /*return*/, new Promise(function (resolve, _) { return resolve(1); })];
            }
            else {
                currencyPair_1 = from_value.toUpperCase() + to_value.toUpperCase();
                now = new Date();
                if (currencyPair_1 in ratesCache &&
                    now < ratesCache[currencyPair_1].expiryDate) {
                    return [2 /*return*/, new Promise(function (resolve, _) {
                            resolve(ratesCache[currencyPair_1].rate);
                        })];
                }
                else {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            request("https://www.google.com/search?q=".concat(from_value, "+to+").concat(to_value, "+&hl=en"), function (error, response, body) {
                                if (error) {
                                    return reject(error);
                                }
                                else {
                                    resolve(body);
                                }
                            });
                        })
                            .then(function (body) {
                            return cheerio_1.default.load(body);
                        })
                            .then(function ($) {
                            return $(".iBp4i").text().split(" ")[0];
                        })
                            .then(function (rates) {
                            if (isDecimalComma) {
                                if (rates.includes("."))
                                    rates = replaceAll(rates, ".", "");
                                if (rates.includes(","))
                                    rates = replaceAll(rates, ",", ".");
                            }
                            else {
                                if (rates.includes(","))
                                    rates = replaceAll(rates, ",", "");
                            }
                            if (isRatesCaching) {
                                addRateToRatesCache(currencyPair_1, parseFloat(rates));
                            }
                            return parseFloat(rates);
                        })];
                }
            }
            return [2 /*return*/];
        });
    }); };
    var convert = function (currencyAmount) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (currencyAmount !== undefined)
                        amount_currency(currencyAmount);
                    if (from == "")
                        throw new Error("currency code cannot be an empty string");
                    if (to == "")
                        throw new Error("currency code cannot be an empty string");
                    if (amount == 0)
                        throw new Error("currency amount should be a positive value");
                    return [4 /*yield*/, rates().then(function (rates) {
                            convertedValue = rates * currencyAmount;
                            return convertedValue;
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var currencyName = function (currencyCode_) {
        if (typeof currencyCode_ != "string")
            throw new TypeError("currency code should be a string");
        if (!currencies_1.currencyCode.includes(currencyCode_.toUpperCase()))
            throw new Error("".concat(currencyCode_, " is not a valid currency code"));
        return currencies_1.currencies[currencyCode_];
    };
    var addRateToRatesCache = function (currencyPair, rate_) {
        if (typeof currencyPair !== "string")
            throw new TypeError("currency pair should be a string");
        if (typeof rate_ !== "number")
            throw new TypeError("rate should be a number");
        var now = new Date();
        if (currencyPair in ratesCache) {
            if (now > ratesCache[currencyPair].expiryDate) {
                var newExpiry = new Date();
                newExpiry.setSeconds(newExpiry.getSeconds() + ratesCacheDuration);
                ratesCache[currencyPair] = {
                    rate: rate_,
                    expiryDate: newExpiry,
                };
            }
        }
        else {
            var newExpiry = new Date();
            newExpiry.setSeconds(newExpiry.getSeconds() + ratesCacheDuration);
            ratesCache[currencyPair] = {
                rate: rate_,
                expiryDate: newExpiry,
            };
        }
    };
    convert(amount).then(function (res) {
        console.log("####### C", res);
        return res;
    });
};
exports.default = CurrencyConverter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Blacklist common values.
var BLACKLIST = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
    "12345678909",
];
var STRICT_STRIP_REGEX = /[.-]/g;
var LOOSE_STRIP_REGEX = /[^\d]/g;
var verifierDigit = function (digits) {
    var numbers = digits.split("").map(function (number) {
        return parseInt(number, 10);
    });
    var modulus = numbers.length + 1;
    var multiplied = numbers.map(function (number, index) { return number * (modulus - index); });
    var mod = multiplied.reduce(function (buffer, number) { return buffer + number; }) % 11;
    return mod < 2 ? 0 : 11 - mod;
};
var strip = function (number, strict) {
    var regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (number || "").replace(regex, "");
};
var format = function (number) {
    return strip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};
var isValid = function (number, strict) {
    var stripped = strip(number, strict);
    // CPF must be defined
    if (!stripped)
        return false;
    // CPF must have 11 chars
    if (stripped.length !== 11)
        return false;
    // CPF can't be blacklisted
    if (BLACKLIST.includes(stripped))
        return false;
    var numbers = stripped.substr(0, 9);
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);
    return numbers.substr(-2) === stripped.substr(-2);
};
var generate = function (formatted) {
    var numbers = "";
    for (var i = 0; i < 9; i += 1) {
        numbers += Math.floor(Math.random() * 9);
    }
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);
    return formatted ? format(numbers) : numbers;
};
exports.default = {
    verifierDigit: verifierDigit,
    strip: strip,
    format: format,
    isValid: isValid,
    generate: generate,
};

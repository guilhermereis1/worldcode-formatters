"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip_code = void 0;
var zip_code = function (value, separator) {
    if (separator === void 0) { separator = false; }
    return String(value)
        .replace(/\D/g, "")
        .slice(0, 8)
        .replace(/(\d{5})(\d{3})/, separator ? "$1-$2" : "$1$2");
};
exports.zip_code = zip_code;

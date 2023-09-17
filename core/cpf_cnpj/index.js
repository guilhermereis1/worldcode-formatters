"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = exports.cnpj = exports.cpf = void 0;
var cpf_1 = require("./cpf/cpf");
exports.cpf = cpf_1.default;
var cnpj_1 = require("./cnpj/cnpj");
exports.cnpj = cnpj_1.default;
var validator = function (joi) { return ({
    type: "document",
    base: joi.string(),
    messages: {
        "document.cpf": "CPF Inválido",
        "document.cnpj": "CNPJ Inválido",
    },
    rules: {
        cpf: {
            validate: function (value, helpers, args, options) {
                if (!cpf_1.default.isValid(value))
                    return helpers.error("document.cpf");
                return value;
            },
        },
        cnpj: {
            validate: function (value, helpers, args, options) {
                if (!cnpj_1.default.isValid(value))
                    return helpers.error("document.cnpj");
                return value;
            },
        },
    },
}); };
exports.validator = validator;
exports.default = exports.validator;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brl = void 0;
var brl = function (value) {
    value = String(value).replace(/[^\d.]/g, "");
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
};
exports.brl = brl;

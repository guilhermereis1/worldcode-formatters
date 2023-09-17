import cpf from "./cpf/cpf";
import cnpj from "./cnpj/cnpj";

export { cpf, cnpj };

export const validator = (joi: any) => ({
  type: "document",
  base: joi.string(),
  messages: {
    "document.cpf": "CPF Inválido",
    "document.cnpj": "CNPJ Inválido",
  },
  rules: {
    cpf: {
      validate(value: any, helpers: any, args: any, options: any) {
        if (!cpf.isValid(value)) return helpers.error("document.cpf");
        return value;
      },
    },
    cnpj: {
      validate(value: any, helpers: any, args: any, options: any) {
        if (!cnpj.isValid(value)) return helpers.error("document.cnpj");
        return value;
      },
    },
  },
});

export default validator;

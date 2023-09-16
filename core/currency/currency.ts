export const brl = (value: any): string => {
  value = String(value).replace(/[^\d.]/g, "");

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

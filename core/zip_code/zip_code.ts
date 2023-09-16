export const zip_code = (value: any, separator: boolean = false): string => {
  return String(value)
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{5})(\d{3})/, separator ? "$1-$2" : "$1$2");
};

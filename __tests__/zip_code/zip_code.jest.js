import { zip_code } from "../../core/zip_code/zip_code"; // Importe o módulo que deseja testar

describe("brl function", () => {
  it("Deve retornar o CEP formatado com separador", () => {
    expect(zip_code("78008435", true)).toBe("78008-435");
  });

  it("Deve retornar o CEP formatado sem separador", () => {
    expect(zip_code("78008435")).toBe("78008435");
  });

  it("Deve retornar o CEP formatado quando caracteres não numéricos estiverem presentes", () => {
    expect(zip_code("X78v00843B5")).toBe("78008435");
  });

  it("Deve retornar o CEP formatado mesmo se houver mais de 8 dígitos", () => {
    expect(zip_code("1234567890", true)).toBe("12345-678");
  });

  it("Deve retornar uma string vazia se o valor de entrada for nulo", () => {
    expect(zip_code(null)).toBe("");
  });

  it("Deve retornar uma string vazia se o valor de entrada for vazia", () => {
    expect(zip_code("")).toBe("");
  });
});

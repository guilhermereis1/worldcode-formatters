import { brl } from "../../core/currency/currency";

describe("brl function", () => {
  it("Deve retornar o valor formatado com separador", () => {
    expect(brl("122.22", true)).toBe("R$ 122,22");
  });

  it("Deve retornar o valor formatado mesmo com caracteres não numéricos", () => {
    expect(brl("x1S2x2.2h2")).toBe("R$ 122,22");
  });

  it("Deve retornar o valor formatado com zeros após o separador", () => {
    expect(brl("122", true)).toBe("R$ 122,00");
  });

  it("Deve retornar R$ 0,00 quando nenhum número for encontrado", () => {
    expect(brl("GAS#", true)).toBe("R$ 0,00");
  });

  it("Deve retornar o valor formatado sem separador", () => {
    expect(brl("1000.50", false)).toBe("R$ 1.000,50");
  });

  it("Deve retornar R$ 0,00 quando o valor for vazio", () => {
    expect(brl("", true)).toBe("R$ 0,00");
  });

  it("Deve retornar R$ 0,00 quando o valor for nulo", () => {
    expect(brl(null)).toBe("R$ 0,00");
  });
});

import { date_time, date } from "../../core/date/date"; // Importe o módulo que deseja testar

describe("Date and Date Time", () => {
  it("Deve retornar a Data formatada", () => {
    expect(date("2023-09-15 21:19:20.909-04")).toBe("15/09/2023");
  });

  it("Deve retornar a Data e Hora formatada", () => {
    expect(date_time("2023-09-15 21:19:20.909-04")).toBe("15/09/2023 21:19:20");
  });

  it("Deve retornar uma String 'Invalid Date Time'", () => {
    expect(date_time("")).toBe("Invalid Date Time");
  });

  it("Deve retornar a Data formatada", () => {
    expect(date("2023-09-15 21:19:20.909-04")).toMatchSnapshot();
  });

  it("Deve retornar a Data e Hora formatada", () => {
    expect(date_time("2023-09-15 21:19:20.909-04")).toMatchSnapshot();
  });

  it("Deve retornar uma String 'Invalid Date Time'", () => {
    expect(date_time("")).toMatchSnapshot();
  });
});

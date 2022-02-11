import {
  generateInterval,
  parserCronToDate,
  validateCrontab,
} from "@/utils/index";

describe("global function", () => {
  it("generate start - end number array", () => {
    expect(generateInterval(0, 29).length).toBe(30);
  });

  it("validateCrontab, error params: 70 100 1-2 2/3 *", () => {
    expect(validateCrontab("70 100 1-2 2/3 *")).toBe(false);
  });

  it("validateCrontab, success params: 0 0/12 1-2 * 1,2", () => {
    expect(validateCrontab("0 0/12 1-2 * 1,2")).toBe(true);
  });

  it("parserCronToDate success", () => {
    let crontabDate = parserCronToDate("0 0/12 * * *");
    expect(crontabDate.length).toBe(5);
  });

  it("parserCronToDate error", () => {
    let crontabDate = parserCronToDate("123 1 1 1 1");
    expect(crontabDate.length).toBe(0);
  });
});

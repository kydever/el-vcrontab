import { parse, parseToString } from "@/components/Crontab/functoins/parser";

describe("parser", () => {
  it("parse crontab when passed", () => {
    const obj = parse("* * * * *");
    expect(obj.dayOfMonth).toStrictEqual("*");
  });
});

describe("parseToString", () => {
  it("parseToString crontab when passed", () => {
    const crontab = parseToString({
      month: 1,
      dayOfMonth: "*",
      dayOfWeek: "*",
      hour: "*",
      minute: "0",
    });
    expect(crontab).toStrictEqual("0 * * 1 *");
  });
});

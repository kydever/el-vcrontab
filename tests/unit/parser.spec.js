import { parse } from "@/Crontab/functoins/parser";

describe("parser", () => {
  it("parse crontab when passed", () => {
    const obj = parse("* * * * *");
    expect(obj.dayOfMonth).toStrictEqual("*");
  });
});

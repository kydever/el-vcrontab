import { mount, createLocalVue } from "@vue/test-utils";
import ElVcrontab from "@/components/Crontab/Crontab.vue";
import {
  CrontabDialog,
  CrontabExpression,
} from "@/components/Crontab/module/index.js";
import { parserCronToDate } from "@/utils";
import ElementUI from "element-ui";

const localVue = createLocalVue();

localVue.use(ElementUI);

describe("CrontabExpression prop crontab render success", () => {
  const wrapper = mount(CrontabExpression, {
    propsData: {
      crontab: "0 0/12 * * *",
    },
    localVue,
  });

  it("render success", () => {
    expect(wrapper.html()).toMatch(/最近5次运行时间/);
  });

  it("crontab parser same", () => {
    expect(JSON.stringify(wrapper.vm.timeList)).toBe(
      JSON.stringify(parserCronToDate("0 0/12 * * *"))
    );
  });
});

describe("CrontabDialog $emit el-vcrontab value success", () => {
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = mount(ElVcrontab, {
    propsData: {
      value: "1 1 1 1 1",
    },
    localVue,
  });

  it("validate crontab-dialog prop", async () => {
    await wrapper.find("button").trigger("click");

    expect(wrapper.findComponent(CrontabDialog).vm.crontabList.join(" ")).toBe(
      "1 1 1 1 1"
    );
  });

  it("watch el-vcrontabl value change", async () => {
    await wrapper.findComponent(CrontabDialog).vm.$emit("change", "3 3 3 3 3");

    expect(wrapper.vm.crontab).toBe("3 3 3 3 3");
  });
});

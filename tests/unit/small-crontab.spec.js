import { shallowMount } from "@vue/test-utils";
import { SmallCrontab } from "@/Crontab";

describe("SmallCrontab.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(SmallCrontab, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

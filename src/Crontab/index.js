// 导入组件，组件必须声明 name
import Crontab from "./Crontab.vue";
import SmallCrontab from "./SmallCrontab";

// 为组件提供 install 安装方法，供按需引入
Crontab.install = function (Vue) {
  Vue.component(Crontab.name, Crontab);
};
SmallCrontab.install = function (Vue) {
  Vue.component(SmallCrontab.name, SmallCrontab);
};

// 导出组件
export { Crontab, SmallCrontab };

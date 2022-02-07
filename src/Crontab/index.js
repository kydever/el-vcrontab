// 导入组件，组件必须声明 name
import Crontab from "./Crontab.vue";

// 为组件提供 install 安装方法，供按需引入
Crontab.install = function (Vue) {
  Vue.component(Crontab.name, Crontab);
};

// 导出组件
export default Crontab;

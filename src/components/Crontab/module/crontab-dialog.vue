<template>
  <el-dialog
    title="生成Cron"
    :visible.sync="dialogVisible"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="dialogVisible"
  >
    <el-tabs type="border-card">
      <el-tab-pane label="分钟">
        <tab-time
          ref="minute"
          :value="crontabList[0]"
          :config="minuteConfig"
          @change="(val) => change(0, val)"
        ></tab-time>
      </el-tab-pane>
      <el-tab-pane label="小时">
        <tab-time
          ref="hour"
          :value="crontabList[1]"
          :config="hourConfig"
          @change="(val) => change(1, val)"
        ></tab-time>
      </el-tab-pane>
      <el-tab-pane label="日">
        <tab-time
          ref="day"
          :value="crontabList[2]"
          :config="dayConfig"
          @change="(val) => change(2, val)"
        ></tab-time>
      </el-tab-pane>
      <el-tab-pane label="月">
        <tab-time
          ref="month"
          :value="crontabList[3]"
          :config="monthConfig"
          @change="(val) => change(3, val)"
        ></tab-time>
      </el-tab-pane>
      <el-tab-pane label="周">
        <tab-time
          ref="weekday"
          :value="crontabList[4]"
          :config="weekdayConfig"
          @change="(val) => change(4, val)"
        ></tab-time>
      </el-tab-pane>
    </el-tabs>

    <crontab-expression :crontab="crontab"></crontab-expression>

    <el-row type="flex" justify="center">
      <el-button type="primary" @click="handleComfirm" size="small"
        >确定</el-button
      >
      <el-button type="warning" @click="handleReset" size="small"
        >重置</el-button
      >
      <el-button @click="handleCancel" size="small">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import TabTime from "./tab-time.vue";
import CrontabExpression from "./crontab-expression.vue";
import { generateInterval } from "@/utils";
export default {
  name: "crontab-dialog",
  components: {
    TabTime,
    CrontabExpression,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      crontabList: ["*", "*", "*", "*", "*"],
      minuteConfig: {
        unit: "分钟",
        list: [
          { type: "all", label: "分钟，允许的通配符[, - * /]" },
          { type: "interval", start: 0, end: 59 },
          { type: "cycle", start: 0, end: 59 },
          { type: "select", options: generateInterval(0, 59) },
        ],
      },
      hourConfig: {
        unit: "小时",
        list: [
          { type: "all", label: "小时，允许的通配符[, - * /]" },
          { type: "interval", start: 0, end: 23 },
          { type: "cycle", start: 0, end: 23 },
          { type: "select", options: generateInterval(0, 23) },
        ],
      },
      dayConfig: {
        unit: "日",
        list: [
          { type: "all", label: "日，允许的通配符[, - * /]" },
          { type: "interval", start: 1, end: 31 },
          { type: "cycle", start: 1, end: 31 },
          { type: "select", options: generateInterval(1, 31) },
        ],
      },
      monthConfig: {
        unit: "月",
        list: [
          { type: "all", label: "月，允许的通配符[, - * /]" },
          { type: "interval", start: 1, end: 12 },
          { type: "cycle", start: 1, end: 12 },
          { type: "select", options: generateInterval(1, 12) },
        ],
      },
      weekdayConfig: {
        unit: "周",
        list: [
          { type: "all", label: "周，允许的通配符[, - * /]" },
          { type: "interval", start: 1, end: 7 },
          { type: "cycle", start: 1, end: 7 },
          { type: "select", options: generateInterval(1, 7) },
        ],
      },
    };
  },
  computed: {
    crontab() {
      let cron = this.crontabList.reduce(
        (previous, current) => previous + current + " ",
        ""
      );
      return cron.substr(0, cron.length - 1);
    },
  },
  watch: {
    // 监听dialogVisible代替watch value 失效问题 避免手动修改了value result无法更新
    dialogVisible() {
      if (this.value) {
        this.crontabList = this.value.split(" ");
      }
    },
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    change(index, val) {
      this.crontabList.splice(index, 1, val);
    },
    handleComfirm() {
      this.$emit("change", this.crontab);
      this.handleCancel();
    },
    handleReset() {
      this.crontabList = this.$options.data().crontabList;
      Object.keys(this.$refs).map((key) => this.$refs[key].reset()); // 选项重置
    },
    handleCancel() {
      this.handleReset();
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
.crontab-expression {
  margin-top: 30px;
}
</style>

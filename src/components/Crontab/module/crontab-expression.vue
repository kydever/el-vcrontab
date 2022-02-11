<template>
  <div class="crontab-expression">
    <el-divider>表达式</el-divider>
    <table>
      <thead>
        <th width="40">分</th>
        <th width="40">时</th>
        <th width="40">日</th>
        <th width="40">月</th>
        <th width="40">周</th>
        <th>Crontab完整表达式</th>
      </thead>
      <tbody>
        <td>
          <span>{{ form.minute }}</span>
        </td>
        <td>
          <span>{{ form.hour }}</span>
        </td>
        <td>
          <span>{{ form.day }}</span>
        </td>
        <td>
          <span>{{ form.month }}</span>
        </td>
        <td>
          <span>{{ form.weekday }}</span>
        </td>
        <td>
          <span>{{ crontab }}</span>
        </td>
      </tbody>
    </table>

    <div class="cron__time">
      <p>最近5次运行时间</p>
      <p v-for="item in timeList" :key="item">{{ item }}</p>
    </div>
  </div>
</template>

<script>
import { validateCrontab, parserCronToDate } from "@/utils";
export default {
  name: "crontab-expression",
  props: {
    crontab: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      timeList: "",
    };
  },
  computed: {
    form() {
      let value = this.crontab.split(" ");
      return {
        minute: value[0],
        hour: value[1],
        day: value[2],
        month: value[3],
        weekday: value[4],
      };
    },
  },
  watch: {
    crontab(val) {
      this.getCrontabTimeList(val);
    },
  },
  created() {
    this.getCrontabTimeList(this.crontab);
  },
  methods: {
    getCrontabTimeList(crontab) {
      if (validateCrontab(crontab)) this.timeList = parserCronToDate(crontab);
    },
  },
};
</script>

<style scoped>
.crontab-expression {
  margin: 10px 0 30px;
}

.crontab-expression table {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}
.crontab-expression table span {
  display: block;
  width: 100%;
  font-family: arial;
  line-height: 30px;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  border: 1px solid #e8e8e8;
}

.cron__time {
  padding: 0 15px;
  box-sizing: border-box;
  margin-top: 20px;
  border: 1px solid #d7d7d7;
}
</style>

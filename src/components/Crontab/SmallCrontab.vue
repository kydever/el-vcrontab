<template>
  <div>
    <el-select v-model="month" placeholder="请选择月份" @change="changeCrontab">
      <el-option
        v-for="item in months"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="dayOfWeek"
      placeholder="请选择周几"
      @change="changeCrontab"
    >
      <el-option
        v-for="item in dayOfWeeks"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="dayOfMonth"
      placeholder="请选择周几"
      @change="changeCrontab"
    >
      <el-option
        v-for="item in dayOfMonths"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select v-model="hour" placeholder="请选择几点" @change="changeCrontab">
      <el-option
        v-for="item in hours"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="minute"
      placeholder="请选择几点"
      @change="changeCrontab"
    >
      <el-option
        v-for="item in minutes"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { parse, parseToString } from "./functoins/parser";

export default {
  name: "SmallCrontab",
  data() {
    return {
      month: "*",
      months: [
        {
          value: "*",
          label: "每月",
        },
      ],
      dayOfWeek: "*",
      dayOfWeeks: [
        {
          value: "*",
          label: "每周",
        },
      ],
      dayOfMonth: "*",
      dayOfMonths: [
        {
          value: "*",
          label: "每天",
        },
      ],
      hour: "*",
      hours: [
        {
          value: "*",
          label: "每小时",
        },
      ],
      minute: "*",
      minutes: [
        {
          value: "*",
          label: "每分",
        },
      ],
    };
  },
  props: {
    crontab: {
      type: String,
      required: true,
    },
  },
  watch: {
    crontab: "load",
  },
  created() {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    months.map((index) => {
      this.months.push({
        value: index.toString(),
        label: index + "月",
      });
    });

    const dayOfWeeks = [0, 1, 2, 3, 4, 5, 6];
    dayOfWeeks.map((index) => {
      this.dayOfWeeks.push({
        value: index.toString(),
        label: "周" + (index === 0 ? "日" : index),
      });
    });

    const dayOfMonths = Array.from(Array(31).keys());
    dayOfMonths.map((index) => {
      this.dayOfMonths.push({
        value: (index + 1).toString(),
        label: index + 1 + "号",
      });
    });

    const hours = Array.from(Array(24).keys());
    hours.map((index) => {
      this.hours.push({
        value: index.toString(),
        label: index + "点",
      });
    });

    const minutes = Array.from(Array(60).keys());
    minutes.map((index) => {
      this.minutes.push({
        value: index.toString(),
        label: index + "分",
      });
    });
  },
  mounted() {
    this.load();
  },
  methods: {
    load: function () {
      if (!this.crontab) {
        return;
      }

      this.formatOptions(this.crontab);
    },
    formatOptions: function (crontab) {
      const obj = parse(crontab);

      this.month = obj.month;
      this.dayOfWeek = obj.dayOfWeek;
      this.dayOfMonth = obj.dayOfMonth;
      this.hour = obj.hour;
      this.minute = obj.minute;
    },
    changeCrontab: function () {
      const crontab = parseToString(this);

      this.$emit("change", crontab);
    },
  },
};
</script>

<style scoped></style>

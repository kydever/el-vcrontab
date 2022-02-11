<template>
  <div class="tab-time">
    <el-radio-group v-model="radio" @change="changeRadio">
      <template v-for="(item, index) in config.list">
        <el-radio
          :label="item.type"
          v-if="item.type === 'all'"
          :key="item.type + index"
          >{{ item.label }}</el-radio
        >
        <el-radio
          :label="item.type"
          v-if="item.type === 'interval'"
          :key="item.type + index"
          >区间
          <span v-if="config.unit === '周'">{{ config.unit }}</span>
          <el-input-number
            v-model="form.start"
            :min="item.start"
            :max="item.end"
            size="small"
            @change="changeNum('interval')"
          ></el-input-number>
          -
          <el-input-number
            v-model="form.end"
            :min="item.start"
            :max="item.end"
            size="small"
            @change="changeNum('interval')"
          ></el-input-number>
          <span v-if="config.unit !== '周'">{{ config.unit }}</span>
        </el-radio>
        <el-radio
          :label="item.type"
          v-if="item.type === 'cycle'"
          :key="item.type + index"
          >周期，从
          <el-input-number
            v-model="form.cycleStart"
            :min="item.start - 1"
            :max="item.end"
            size="small"
            @change="changeNum('cycle')"
          ></el-input-number>
          开始，每<span v-if="config.unit === '周'">个{{ config.unit }}</span>
          <el-input-number
            v-model="form.cycleEnd"
            :min="item.start"
            :max="item.end"
            size="small"
            @change="changeNum('cycle')"
          ></el-input-number>
          <span v-if="config.unit !== '周'">{{ config.unit }}</span
          >执行一次
        </el-radio>
        <el-radio
          :label="item.type"
          v-if="item.type === 'select'"
          :key="item.type + index"
          >指定
          <el-select
            v-model="form.seleted"
            multiple
            size="mini"
            placeholder="请选择"
            @change="changeNum('select')"
            clearable
          >
            <el-option
              v-for="item in item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-radio>
      </template>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "tab-time",
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      radio: "all",
      form: {
        start: 0,
        end: 60,
        cycleStart: 0,
        cycleEnd: 1,
        seleted: [],
      },
    };
  },
  computed: {
    cycleMin() {
      return this.config.list.find((item) => item.type === "cycle").start;
    },
  },
  created() {
    this.antiParse(this.value);
  },
  methods: {
    changeRadio(type) {
      switch (type) {
        case "all":
          this.$emit("change", "*");
          break;

        case "interval":
          this.$emit("change", `${this.form.start}-${this.form.end}`);
          break;

        case "cycle":
          this.$emit(
            "change",
            `${
              this.form.cycleStart < this.cycleMin ? "*" : this.form.cycleStart
            }/${this.form.cycleEnd}`
          ); // 判断最小cycle范围 兼容*
          break;

        case "select":
          if (this.form.seleted.length > 0)
            this.$emit("change", this.form.seleted.join(","));
          break;

        default:
          break;
      }
    },

    changeNum(type) {
      if (type === this.radio) this.changeRadio(type);
    },

    reset() {
      let data = this.$options.data();
      this.form = data.form;
      this.radio = data.radio;
    },
    antiParse(val) {
      const intervalReg = /^\d{1,2}-\d{1,2}$/;
      const cycleReg = /^(\d{1,2}|\*)\/\d{1,2}$/;
      const selectReg = /^\d{1,2}((,\d{1,2})+)?$/;
      let result = "all";
      if (val === "*") {
        result = "all";
      } else if (intervalReg.test(val)) {
        result = "interval";
        const [start, end] = val.split("-");
        this.form.start = start;
        this.form.end = end;
      } else if (cycleReg.test(val)) {
        result = "cycle";
        const [start, end] = val.split("/");
        this.form.cycleStart = start === "*" ? this.cycleMin - 1 : start;
        this.form.cycleEnd = end;
      } else if (selectReg.test(val)) {
        result = "select";
        this.form.seleted = val.split(",").map((i) => Number(i));
      }
      this.radio = result;
    },
  },
};
</script>

<style scoped>
.tab-time >>> .el-radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.tab-time >>> .el-radio {
  margin: 5px 0;
  height: 40px;
  line-height: 40px;
}
.tab-time .el-select {
  width: 90%;
}
</style>

<template>
  <div class="dx-crontab">
    <el-input
      v-model="crontab"
      class="crontab__input"
      :placeholder="placeholder"
      :size="size"
      :readonly="readonly"
      :disabled="disabled"
      clearable
    ></el-input>
    <el-button :size="size" type="primary" @click="generateCron" :disabled="disabled"
      >生成Cron</el-button
    >

    <crontab-dialog
      ref="CrontabDialog"
      :value="crontab"
      @change="changeCrontab"
    ></crontab-dialog>
  </div>
</template>

<script>
import { CrontabDialog } from "./module";
import { validateCrontab } from "@/utils";

export default {
  name: "el-vcrontab",
  components: {
    CrontabDialog,
  },
  props: {
    value: {
      required: true,
      default: () => "",
    },
    size: {
      type: String,
      default: "small",
      validator: (val) => {
        return ["medium", "small", "mini"].includes(val);
      },
    },
    placeholder: {
      type: String,
      default: () => "请输入或生成Cron",
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      crontab: "",
    };
  },
  watch: {
    crontab(val) {
      this.$emit("input", val);
      this.$emit("change", val);
    },
  },
  created() {
    if (this.value) this.crontab = this.value;
  },
  methods: {
    generateCron() {
      if (this.crontab && !validateCrontab(this.crontab)) {
        this.$message.error("无效Crontab表达式");
      } else {
        this.$refs.CrontabDialog.show();
      }
    },
    changeCrontab(val) {
      this.crontab = val;
    },
  },
};
</script>

<style scoped>
.dx-crontab {
  display: inline-block;
}
.crontab__input {
  width: 200px;
  margin-right: 20px;
}
</style>

<template>
  <div id="app">
    <!-- <SmallCrontab :crontab="crontab" /> -->
    <el-vcrontab v-model="crontab"></el-vcrontab>
  </div>
</template>

<script>
import ElVcrontab from "../src/components/Crontab/Crontab.vue";

export default {
  name: "App",
  data() {
    return {
      crontab: "* * * 1 *",
    };
  },
  components: {
    ElVcrontab,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

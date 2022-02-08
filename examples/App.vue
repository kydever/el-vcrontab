<template>
  <div id="app">
    <SmallCrontab :crontab="crontab" @change="pickCrontab" />
  </div>
</template>

<script>
import { SmallCrontab } from "@/index";

export default {
  name: "App",
  data() {
    return {
      crontab: "* * * * *",
    };
  },
  components: {
    SmallCrontab,
  },
  methods: {
    pickCrontab: function (crontab) {
      this.crontab = crontab;
      console.log(this.crontab);
    },
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

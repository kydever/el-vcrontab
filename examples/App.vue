<template>
  <div id="app">
    <SmallCrontab :crontab="crontab" />
  </div>
</template>

<script>
import { SmallCrontab } from "@/index";

export default {
  name: "App",
  data() {
    return {
      crontab: "* * * 1 *",
    };
  },
  components: {
    SmallCrontab,
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

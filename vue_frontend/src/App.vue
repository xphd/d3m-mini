<template>
  <div id="app">
    <WorkFlow/>
  </div>
</template>

<script>
import WorkFlow from "./components/WorkFlow.vue";

export default {
  name: "app",
  components: {
    WorkFlow
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

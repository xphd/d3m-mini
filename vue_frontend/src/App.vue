<template>
  <div id="app">
    <!-- <WorkFlow/> -->
    <ScoreSolution/>
  </div>
</template>

<script>
// import WorkFlow from "./components/WorkFlow.vue";
import ScoreSolution from "./components/ScoreSolution.vue";

export default {
  name: "app",
  components: {
    // WorkFlow,
    ScoreSolution
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

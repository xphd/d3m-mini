<template>
  <div>
    <h1>Score Solution</h1>
    <button @click="helloSearch">Hello and Search Solutions</button>
    <br>
    <button @click="getAllSolutions">GetAllSolutions</button>
    <div>
      <li v-for="(solutionID, index) in solutionIDs" :key="index">
        <input type="checkbox" :value="solutionID" v-model="solutionIDs_selected">
        {{solutionID}}
      </li>
      <p>{{solutionIDs_selected}}</p>
    </div>
    <div>
      <li v-for="(metric, index) in metrics" :key="index">
        <input type="checkbox" :value="metric" v-model="metrics_selected">
        {{metric}}
      </li>
      <p>{{metrics_selected}}</p>
    </div>

    <button @click="scoreSelectedSolutions">scoreSelectedSolutions</button>
  </div>
</template>

<script>
export default {
  name: "score-solution",
  data() {
    return {
      solutionIDs: [],
      solutionIDs_selected: [],
      metrics_selected: ["accuracy", "recall", "f1"],
      metrics: [
        "accuracy",
        "recall",
        "f1",
        "f1Micro",
        "f1Macro"
        // "rocAuc",
        // "rocAucMicro",
        // "rocAucMacro",
        // "meanSquaredError",
        // "rootMeanSquaredError",
        // "rootMeanSquareErrorAvg",
        // "meanAbsoluteError",
        // "rSquared",
        // "normalizedMutualInformation",
        // "jaccardSimilarityScore",
        // "precisionAtTopK",
        // "objectDetectionAveragePrecision",
        // "loss"
      ]
    };
  },
  methods: {
    helloSearch() {
      this.$socket.emit("helloSearch");
    },
    getAllSolutions() {
      console.log("getAllSolutions");
      this.$socket.emit("getAllSolutions");
    },
    scoreSelectedSolutions() {
      console.log("scoreSelectedSolutions");
      this.$socket.emit(
        "scoreSelectedSolutions",
        this.solutionIDs_selected,
        this.metrics_selected
      );
    }
  },
  sockets: {
    connect() {
      console.log("Client: try to connect!");
    },
    getAllSolutionsResponse(solutionIDs) {
      console.log("getAllSolutionsResponse");
      // const solutions = JSON.parse(solutionsStr)
      console.log(solutionIDs);
      this.solutionIDs = solutionIDs;
      console.log("Size of solutions:", this.solutionIDs.length);
    }
  }
};
</script>

<style scoped>
</style>
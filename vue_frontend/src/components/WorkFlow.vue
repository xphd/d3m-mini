<template>
  <div>
    <h1>Work Flow</h1>
    <p>TA3-TA2-API</p>

    <button @click="hello">Hello</button>
    <br>

    <button @click="searchSolutions">SearchSolutions</button>
    <br>
    <button @click="getSearchSolutionsResults">GetSearchSolutionsResults</button>
    <br>
    <button @click="endSearchSolutions">EndSearchSolutions</button>
    <br>
    <button @click="stopSearchSolutions">StopSearchSolutions</button>
    <br>
    <button @click="describeSolution">DescribeSolution</button>
    <br>

    <button @click="scoreSolution">ScoreSolution</button>
    <br>
    <button @click="getScoreSolutionResults">GetScoreSolutionResults</button>
    <br>
    <button @click="fitSolution">FitSolution</button>
    <br>
    <button @click="getFitSolutionResults">GetFitSolutionResults</button>
    <br>
    <button @click="produceSolution">ProduceSolution</button>
    <br>

    <button @click="getProduceSolutionResults">GetProduceSolutionResults</button>
    <br>
    <button @click="solutionExport">SolutionExport</button>
    <br>
    <button @click="updateProblem">UpdateProblem</button>
    <br>
    <button @click="listPrimitives">ListPrimitives</button>
    <br>
    <button @click="getAllSolutions">GetAllSolutions</button>

    <div>
      
        <li v-for="(solutionID, index) in solutionIDs" :key="index">
          <input type="checkbox" :value="solutionID" v-model="solutionIDs_selected">
          {{solutionID}}
        </li>
      
      <p>{{solutionIDs_selected}}</p>
      <button @click="scoreSelectedSolutions">scoreSelectedSolutions</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "work-flow",
  data() {
    return {
      solutionIDs: [],
      solutionIDs_selected: []
    };
  },
  methods: {
    hello() {
      console.log("hello");
      this.$socket.emit("hello");
    },
    searchSolutions() {
      console.log("searchSolutions");
      this.$socket.emit("searchSolutions");
    },
    getSearchSolutionsResults() {
      console.log("getSearchSolutionsResults");

      this.$socket.emit("getSearchSolutionsResults");
    },
    endSearchSolutions() {
      console.log("endSearchSolutions");
      this.$socket.emit("endSearchSolutions");
    },
    stopSearchSolutions() {
      console.log("stopSearchSolutions");
      this.$socket.emit("stopSearchSolutions");
    },
    describeSolution() {
      console.log("describeSolution");
      this.$socket.emit("describeSolution");
    },
    scoreSolution() {
      console.log("scoreSolution");
      this.$socket.emit("scoreSolution");
    },
    getScoreSolutionResults() {
      console.log("getScoreSolutionResults");
      this.$socket.emit("getScoreSolutionResults");
    },
    fitSolution() {
      console.log("fitSolution");
      this.$socket.emit("fitSolution");
    },
    getFitSolutionResults() {
      console.log("getFitSolutionResults");
      this.$socket.emit("getFitSolutionResults");
    },
    produceSolution() {
      console.log("produceSolution");
      this.$socket.emit("produceSolution");
    },
    getProduceSolutionResults() {
      console.log("getProduceSolutionResults");
      this.$socket.emit("getProduceSolutionResults");
    },
    solutionExport() {
      console.log("solutionExport");
      this.$socket.emit("solutionExport");
    },
    updateProblem() {
      console.log("updateProblem");
      this.$socket.emit("updateProblem");
    },
    listPrimitives() {
      console.log("listPrimitives");
      this.$socket.emit("listPrimitives");
    },
    getAllSolutions() {
      console.log("getAllSolutions");
      this.$socket.emit("getAllSolutions");
    },
    scoreSelectedSolutions(){
      console.log("scoreSelectedSolutions")
      this.$socket.emit("scoreSelectedSolutions",this.solutionIDs_selected)
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
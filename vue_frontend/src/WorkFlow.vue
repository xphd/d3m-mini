<template>
  <div>
    <h1>Work Flow</h1>
    <p>TA3-TA2-API</p>

    <button>SearchSolutions</button> <br>
    <button>GetSearchSolutionsResults</button><br>
    <button>EndSearchSolutions</button><br>
    <button>StopSearchSolutions</button><br>
    <button>DescribeSolution</button><br>

    <button>ScoreSolution</button><br>
    <button>GetScoreSolutionResults</button><br>
    <button>FitSolution</button><br>
    <button>GetFitSolutionResults</button><br>
    <button>ProduceSolution</button><br>

    <button>GetProduceSolutionResults</button><br>
    <button>SolutionExport</button><br>
    <button>UpdateProblem</button><br>
    <button>buttonstPrimitives</button><br>
    <button>Hello</button><br>
  </div>
</template>

<script>
export default {
  methods: {
    searchSolutions() {this.$socket.emit("searchSolutions");},
    getSearchSolutionsResults() {this.$socket.emit("getSearchSolutionsResults");},
    endSearchSolutions() {this.$socket.emit("endSearchSolutions");},
    stopSearchSolutions() {this.$socket.emit("stopSearchSolutions");},
    describeSolution() {this.$socket.emit("describeSolution");},
    scoreSolution() {this.$socket.emit("scoreSolution");},
    getScoreSolutionResults() {this.$socket.emit("getScoreSolutionResults");},
    fitSolution() {this.$socket.emit("fitSolution");},
    getFitSolutionResults() {this.$socket.emit("getFitSolutionResults");},
    produceSolution() {this.$socket.emit("produceSolution");},
    getProduceSolutionResults() {this.$socket.emit("getProduceSolutionResults");},
    solutionExport() {this.$socket.emit("solutionExport");},
    updateProblem() {this.$socket.emit("updateProblem");},
    listPrimitives() {this.$socket.emit("listPrimitives");},

    connect(){
        console.log("Client: try to connect!")
    }
  },
  sockets: {}
};
</script>

<style scoped>
</style>
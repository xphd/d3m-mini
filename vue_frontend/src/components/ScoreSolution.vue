<template>
  <div>
    <h1>Score Solution</h1>

    <button @click="hello">Hello</button>
    <br>
    <button @click="searchSolutions">SearchSolutions</button>
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
  name: "score-solution",
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
    listPrimitives() {
      console.log("listPrimitives");
      this.$socket.emit("listPrimitives");
    },
    getAllSolutions() {
      console.log("getAllSolutions");
      this.$socket.emit("getAllSolutions");
    },
    scoreSelectedSolutions() {
      console.log("scoreSelectedSolutions");
      this.$socket.emit("scoreSelectedSolutions", this.solutionIDs_selected);
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
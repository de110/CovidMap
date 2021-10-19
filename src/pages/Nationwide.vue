<template>
  <div id="nationwide">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap"
      rel="stylesheet"
    />
    <covid-title />
    <CovidMap />
    <CovidGraph />
  </div>
</template>

<script>
import CovidGraph from "../components/CovidGraph.vue";
import CovidMap from "../components/CovidMap.vue";
import CovidTitle from "../components/CovidTitle.vue";

export default {
  name: "nationwide",
  components: {
    CovidMap,
    CovidGraph,
    CovidTitle,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap");
#app {
  font-family: "Noto Sans KR", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

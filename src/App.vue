<template>
  <div id="app">
    <!-- <router-link to="/Nationwide">Nationwide</router-link> | -->
    <!-- <router-link to="/City">City</router-link> -->
    <!-- <router-view></router-view> -->
    <!-- <city /> -->
    <router-view />
    <!-- <covid-title /> -->
    <!-- <covid-map />
    <covid-graph /> -->
    <!-- <covid-map /> -->
  </div>
</template>

<script>
// import CovidMap from "./components/CovidMap.vue";
export default {
  name: "app",
  components: {},
  // options: {
  //   responsive: true,
  // },
  mounted() {},
};
</script>

<style>
#app {
  margin: 0 auto;
  width: 750px;
  min-height: 100%;
  padding-top: 0px;
  /* border-left: 1px #d8d8d8 solid;
  border-right: 1px #d8d8d8 solid; */
  /* positon: relative; */
  text-align: center;
} /* 여백제거 + 드래그방지 */
body {
  padding: 0;
  margin: 0;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
} /* 반응형 시작 */
@media (max-width: 750px) {
  #app {
    width: 100%;
    border-left: 0;
    border-right: 0;
  }
}
</style>

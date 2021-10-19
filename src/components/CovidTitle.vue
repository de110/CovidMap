<template>
  <div class="row-mt-5">
    <div class="title">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap"
        rel="stylesheet"
      />
      <h2 class="text-center">COVID-DATA</h2>
      <h4 class="text-center">{{ this.date }}</h4>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      date: new Date(),
    };
  },
  created() {
    this.date = dayjs(this.date).format("YYYYMMDD");
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap");
.row-mt-5 {
  .title {
    font-family: "Noto Sans KR", sans-serif;
    border-bottom: 2px solid black;
    width: 30%;
  }

  .text-center {
    height: 20px;
  }
}
</style>

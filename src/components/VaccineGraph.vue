<template>
  <div class="container">
    <div class="row mt-5" v-if="arrPositive.length > 0">
      <div class="col">
        <line-chart
          :height="200"
          :chartData="arrPositive"
          :options="chartOptions"
          :chartColors="positiveChartColors"
          label="Positive"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "../components/LineChart.vue";
import dayjs from "dayjs";
import { MetropoliApi } from '../api';

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      arrPositive: [],
      positiveChartColors: {
        backgroundColor: "#EF5350",
      },
      date: [],
      chartOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        maintainAspectRatio: false,
      },
      range: {
        start: new Date().getTime() - 8 * 24 * 60 * 60 * 1000,
        end: new Date().getTime(),
      },
    };
  },
  async created() {
    let startCreateDt = dayjs(this.range.start).format("YYYY-MM-DD");
    this.data=await MetropoliApi(startCreateDt);

    for (var i = 0; i < this.data.length; i++) {
      this.data[i] ? this.data[i].sido : "";
      if (this.data[i].sido == "경기도") {
        this.sido = this.data[i].sido;
        this.total = this.data[i].firstCnt;
      }
    }

  },
};
</script>
<style lang="scss">
.container {
  padding: 0px 30px 30px 30px;
}
.col {
  border: 1.5px solid lightgray;
  border-radius: 10px;
  padding: 50px;
}
</style>

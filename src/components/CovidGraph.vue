<template>
  <div class="container">
    <div class="row mt-5" v-if="arrPositive.length > 0">
      <div class="col">
        <!-- <line-chart
          :chartData="arrPositive"
          :options="chartOptions"
          :chartColors="positiveChartColors"
           label="Positive"
        /> -->
        <line-chart
          :height="200"
          :chartData="arrPositive"
          :options="chartOptions"
          :chartColors="positiveChartColors"
          label="확진자 수"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import LineChart from "../components/LineChart.vue";
import dayjs from "dayjs";
import { nationGraphApi } from '../api';

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      data:[],
      arrPositive: [],
      positiveChartColors: {
        // borderDash: [],
        backgroundColor: "#EF5350",
        //"#ED544A" #CF4C4C,"#F44336"
      },
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
        // responsive: true,
        maintainAspectRatio: false,
      },
      range: {
        start: new Date().getTime() - 8 * 24 * 60 * 60 * 1000,
        end: new Date(),
      },
      startCreateDt: null,
      endCreateDt: null,
    };
  },
  async created() {

    this.startCreateDt = dayjs(this.range.start).format("YYYYMMDD");
    this.endCreateDt = dayjs(this.range.end).format("YYYYMMDD");

    // 날짜 순서대로 재정렬
    this.data.sort((a, b) => {
      return a.createDt > b.createDt ? -1 : a.createDt < b.createDt ? 1 : 0;
    });

    this.data = await nationGraphApi(this.startCreateDt,this.endCreateDt);

    for (var i = 0; i < this.data.length - 1; i++) {
      const date = this.data[i].stateDt;
      console.log(this.data);
      const to = this.data[i].decideCnt - this.data[i + 1].decideCnt;
      this.arrPositive.push({ date, total: to });
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
  // align: center;
  padding: 50px;
}
</style>

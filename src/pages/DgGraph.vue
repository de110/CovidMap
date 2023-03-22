<template>
  <div class="container">
    <div class="row mt-5" v-if="arrPositive.length > 0">
      <div class="col">
        <line-chart
          :height="200"
          :chartData="arrPositive"
          :options="chartOptions"
          :chartColors="positiveChartColors"
          label="지역 확진자 수"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "../components/LineChart.vue";
import dayjs from "dayjs";

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
        start: new Date().getTime() - 6 * 24 * 60 * 60 * 1000,
        end: new Date(),
      },
    };
  },
  async created() {
    let startCreateDt = dayjs(this.range.start).format("YYYYMMDD");
    let endCreateDt = startCreateDt;
    
    // 날짜 순서대로 재정렬
    this.data.sort((a, b) => {
      return a.createDt > b.createDt ? -1 : a.createDt < b.createDt ? 1 : 0;
    });
    
    this.data=await localApi(startCreateDt,endCreateDt);

    for (var i = 0; i < this.data.length - 1; i++) {
      if (this.data[i].gubun == "경기") {
        const date = dayjs(this.data[i].createDt).format("YYYYMMDD");

        const to = this.data[i].incDec - this.data[i + 1].incDec;
        this.arrPositive.push({ date, total: to });
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

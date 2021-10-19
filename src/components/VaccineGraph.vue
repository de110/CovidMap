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
import axios from "axios";
import LineChart from "../components/LineChart.vue";
// import {api} from "../components/LocalMap.vue"
import dayjs from "dayjs";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      arrPositive: [],
      positiveChartColors: {
        // borderDash: [],
        backgroundColor: "#EF5350",
        //"#ED544A" #CF4C4C,"#F44336"
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
        // responsive: true,
        maintainAspectRatio: false,
      },
      range: {
        start: new Date().getTime() - 8 * 24 * 60 * 60 * 1000,
        end: new Date().getTime(),
      },
      startCreateDt: null,
      endCreateDt: null,
    };
  },
  async created() {
    const url = "/two/api/15077756/v1/vaccine-stat";
    const serviceKey =
      "rp3lvczaoVPpOPI%2FsYJJJzknBUNL0LPaAo5HCXybKpsIm1YJjvR%2BtxFV0qoMH38Xq1jLsRN%2B%2BvvOp4XWFw4jkw%3D%3D";
    let page = "1";
    let perPage = "10";
    this.startCreateDt = dayjs(this.range.start).format("YYYY-MM-DD");
    this.endCreateDt = dayjs(this.range.end).format("YYYYMMDD");

    // let CreateDt = [this.startCreateDt, this.endCreateDt];
    // console.log(CreateDt);
    try {
      let response = await axios.get(
        url +
          "?page=" +
          page +
          "&perPage=" +
          perPage +
          "&returnType=JSON" +
          "&cond%5BbaseDate%3A%3AEQ%5D=" +
          this.startCreateDt +
          "%2000%3A00%3A00" +
          "&serviceKey=" +
          serviceKey
      );
      this.data = response.data.data;
    } catch (error) {
      console.log(error);
    }

    for (var i = 0; i < this.data.length; i++) {
      this.data[i] ? this.data[i].sido : "";
      if (this.data[i].sido == "경기도") {
        this.sido = this.data[i].sido;
        this.total = this.data[i].firstCnt;
        // this.arrPositive.push({ date, total: this.total });
      }
    }

    // for (var i = 0; i < this.data.length - 1; i++) {
    //   const date = this.data[i].stateDt;
    //   // const to = this.data[i].decideCnt;
    //   // console.log(date);
    //   const to = this.data[i].decideCnt - this.data[i + 1].decideCnt;
    //   this.arrPositive.push({ date, total: to });

    //   // console.log(date);
    // }
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

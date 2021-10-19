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
        start: new Date().getTime() - 6 * 24 * 60 * 60 * 1000,
        end: new Date(),
      },
      startCreateDt: null,
      endCreateDt: null,
    };
  },
  async created() {
    // const url =
    //   "/one/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=rp3lvczaoVPpOPI%2FsYJJJzknBUNL0LPaAo5HCXybKpsIm1YJjvR%2BtxFV0qoMH38Xq1jLsRN%2B%2BvvOp4XWFw4jkw%3D%3D&pageNo=1&numOfRow=10&startCreateDt=20210829&endCreateDt=20210829";
    const url = "/one/openapi/service/rest/Covid19/getCovid19SidoInfStateJson";
    // const url = "/one/openapi/service/rest/Covid19/getCovid19InfStateJson";
    const serviceKey =
      "rp3lvczaoVPpOPI%2FsYJJJzknBUNL0LPaAo5HCXybKpsIm1YJjvR%2BtxFV0qoMH38Xq1jLsRN%2B%2BvvOp4XWFw4jkw%3D%3D";

    let pageNo = "1";
    let numOfRow = "10";

    this.startCreateDt = dayjs(this.range.start).format("YYYYMMDD");
    this.endCreateDt = dayjs(this.range.end).format("YYYYMMDD");

    try {
      let response = await axios.get(
        url +
          "?serviceKey=" +
          serviceKey +
          "&pageNo" +
          pageNo +
          "&numOfRows=" +
          numOfRow +
          "&startCreateDt=" +
          this.startCreateDt +
          "&endCreateDt=" +
          this.endCreateDt
      );
      this.data = response.data.response.body.items.item;
    } catch (error) {
      console.log(error);
    }

    // 날짜 순서대로 재정렬
    this.data.sort((a, b) => {
      return a.createDt > b.createDt ? -1 : a.createDt < b.createDt ? 1 : 0;
    });

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

<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    // legend: false,
    options: {
      // responsive: true,
      type: Object,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: true,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
    chartColors: {
      type: Object,
    },
  },
  mounted() {
    const dates = this.chartData.map((d) => d.date).reverse();
    const totals = this.chartData.map((d) => d.total).reverse();
    const {
      // drawBorder,
      // borderColor,
      // borderWidth,
      // pointBorderColor,
      // pointBackgroundColor,
      backgroundColor,
    } = this.chartColors;
    this.datacollection = {
      labels: dates,
      datasets: [
        {
          label: this.label,
          data: totals,
          // borderColor: borderColor,
          backgroundColor: backgroundColor,
          barThickness: 10,
        },
      ],
    };
    this.renderChart(
      // {
      //   labels: dates,
      //   datasets: [
      //     {
      //             label: this.label,
      //             data: totals,

      //       borderColor: drawBorder,
      //       borderColor: borderColor,
      //             borderWidth: borderWidth,
      //             pointBorderColor: pointBorderColor,
      //             pointBackgroundColor: pointBackgroundColor,
      //       backgroundColor: backgroundColor,
      //     },
      //   ],
      // },
      this.datacollection,
      this.options
    );
  },
};
</script>

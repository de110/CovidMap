<template>
  <div id="sejong" class="sejong">
    <covid-title />
    <div id="lmap-wrapper" class="lmap-wrapper">
      <svg>
        <text class="info" x="10" y="30">{{ sido }} 백신 접종</text>
        <g id="map-g" class="map-g"></g>
        <g class="rect-1"></g>
        <g class="rect-2"></g>
        <g id="text-g" class="text-g">
          <text class="text-wrapper" font-size="10">
            1차 접종
            <tspan x="155" y="202" font-size="15">{{ firstTotal }}%</tspan>
          </text>

          <text class="secondtext" font-size="10" x="210" y="225">
            2차 접종
            <tspan x="203" y="243" font-size="15">{{ secondTotal }}%</tspan>
          </text>
        </g>
      </svg>
    </div>
    <gyeonggi-graph />
  </div>
</template>

<script>
import * as d3 from "d3";
import dayjs from "dayjs";
import GyeonggiGraph from "./LocalGraph.vue";
import CovidTitle from "../components/CovidTitle.vue";
import { MetropoliApi } from '../api';

const MAP_GEOJSON = require("../assets/local/Sejong.json");
const population = 366560;

export default {
  components: { GyeonggiGraph, CovidTitle },
  props: {},
  data() {
    return {
      data: [],
      arr: ["0"],
      sido: "",
      firstTotal: "",
      secondTotal: "",

      range: {
        start: new Date(),
        end: new Date(),
      },
    };
  },
  computed: {},
  created() {
    this.api();
  },
  mounted() {
    this.drawMap();
  },

  methods: {
    async api() {
      let startCreateDt = dayjs(this.range.start).format("YYYY-MM-DD");
      this.data=await MetropoliApi(startCreateDt);

      for (var i = 0; i < this.data.length; i++) {
        this.data[i] ? this.data[i].sido : "";
        if (this.data[i].sido == "세종특별자치시") {
          this.sido = this.data[i].sido;
          this.firstTotal = (
            (this.data[i].totalFirstCnt / population) *
            100
          ).toFixed(2);
          this.secondTotal = (
            (this.data[i].totalSecondCnt / population) *
            100
          ).toFixed(2);
        }
      }
    },

    drawMap() {
      const geojson = MAP_GEOJSON;

      // 브라우저 크기
      const divWidth = document.getElementById("lmap-wrapper").clientWidth;
      const width = divWidth < 1000 ? divWidth * 0.9 : 1000;
      const height = width * 1;

      const svg = d3
        .select(".lmap-wrapper")
        .select("svg")
        .attr("width", width)
        .attr("height", height);

      const mapLayer = svg.select("#map-g");
      const textLayer = svg.select(".text-wrapper");

      const boxLayer = svg
        .select(".rect-1")
        .attr("width", 200)
        .attr("height", 200);

      const boxLayer2 = svg
        .select(".rect-2")
        .attr("width", 200)
        .attr("height", 200);

      // 지도의 출력 방법을 선택(메로카토르)
      let projection = d3
        .geoMercator()
        .scale(1)
        .translate([0, 0]);

      // svg 그림의 크기에 따라 출력될 지도의 크기를 다시 계산
      const path = d3.geoPath().projection(projection);
      const bounds = path.bounds(geojson);
      const widthScale = (bounds[1][0] - bounds[0][0]) / width;
      const heightScale = (bounds[1][1] - bounds[0][1]) / height;
      const scale = 0.55 / Math.max(widthScale, heightScale);
      const xoffset =
        width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2 + 0;
      const yoffset =
        height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2 + 0;
      const offset = [xoffset, yoffset];
      projection.scale(scale).translate(offset);

      // 지도 그리기
      mapLayer
        .selectAll("path") // path 태그 전체 선택
        .data(geojson.features) // 선택한 객체에 특징점 데이터 바인드
        .enter() // 대응하는 path 요소가 없는 데이터에 대해 새로운 selection 반환
        .append("path") // 선택된 요소들에 대해 path 태그로 이루어진 요소 생성
        .attr("d", path) // d(svg drawing 속성, path data) 태그에 path 속성 추가
        .attr("vector-effect", "non-scaling-stroke")
        .style("fill", "#CCE1FF");
      boxLayer
        .selectAll("rect")
        .data(this.arr)
        .enter()
        .append("rect")
        .attr("width", "60")
        .attr("height", "40")
        .data(geojson.features)
        .attr("x", 150)
        .attr("y", function(d) {
          return path.centroid(d)[1] - 13;
        })
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "white");
      boxLayer2
        .selectAll("rect")
        .data(this.arr)
        .enter()
        .append("rect")
        .attr("width", "60")
        .attr("height", "40")
        .attr("x", 197)
        .attr("y", 210)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "white");
      textLayer
        .attr("x", 163)
        .attr("y", 183)
        .attr("fill", "black");
    },
  },
};
</script>

<style lang="scss">
.localmap {
  padding: 0px 0px 30px 0px;
}
.lmap-wrapper {
  padding: 30px 0px 30px 0px;
  svg {
    border: 1.5px solid lightgray;
    border-radius: 10px;
  }
  rect {
    // filter: drop-shadow(0px 0px 2px lightgray);
    filter: drop-shadow(0px 0px 2px #72adff);
  }
  // .map-g {
  //   stroke: white;
  //   stroke-width: 1px;
  // }
}

// .g-svg {
//   position: relative;
//   text-align: center;
//   border: 1.5px solid lightgray;
//   border-radius: 10px;
// }
</style>

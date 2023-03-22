<template>
  <div id="jeonnam">
    <covid-title/>
  <div id="mt-3" class="mt-3">
    <div id="map-wrapper" class="map-wrapper">
      <svg>
        <g class="map-g"></g>
      </svg>
    </div>
  </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import dayjs from "dayjs";
import { localApi } from '../api';
import CovidTitle from '../components/CovidTitle.vue';

const MAP_GEOJSON = require("../assets/map.json");

export default {
  components: {CovidTitle},
  props: {},
  data() {
    return {
      data: [],
      arr: [
        "0","0","0","0","0",
        "0","0","0","0","0",
        "0","0","0","0","0",
        "0","0"
      ],
      range: {
        start: new Date().getTime() - 1 * 24 * 60 * 60 * 1000,
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
      let startCreateDt = dayjs(this.range.start).format("YYYYMMDD");
      let endCreateDt = startCreateDt;

      // 날짜 순서대로 재정렬
      this.data.sort((a, b) => {
        return a.createDt > b.createDt ? -1 : a.createDt < b.createDt ? 1 : 0;
      });
      
      this.data=await localApi(startCreateDt,endCreateDt);

      this.data.splice(0, 1);
      this.data.splice(17, 1);

      this.data.sort((a, b) => {
        return a.gubun < b.gubun ? -1 : a.gubun == b.gubun ? 0 : 1;
      });
      for (var i = 0; i < this.data.length; i++) {
        const gubun = this.data[i].gubun;
        const to = this.data[i].localOccCnt;
        this.$set(this.arr, i, { gubun: gubun, total: to });
      }
    },
    drawMap(n, m) {
      // 지도정보
      var geojson = MAP_GEOJSON;

      n = 1;
      m = 16;
      geojson.features.splice(n, m);
     
        // 현재의 브라우저의 크기 계산
      const divWidth = document.getElementById("map-wrapper").clientWidth;

      const width = divWidth < 1000 ? divWidth * 1 : 1000;
      const height = width * 1;

      // 지도를 그리기 위한 svg 생성
      const svg = d3
        .select(".map-wrapper")
        .select("svg")
        .attr("width", width)
        .attr("height", height);

      const mapLayer = svg.select("g").classed("map-wrapper", true);

      //   지도의 출력 방법을 선택(메로카토르)
      let projection = d3
        .geoMercator()
        .scale(1)
        .translate([0, 0]);

      // svg 그림의 크기에 따라 출력될 지도의 크기를 다시 계산
      const path = d3.geoPath().projection(projection);
      const bounds = path.bounds(geojson);
      //   console.log(bounds);
      const widthScale = (bounds[1][0] - bounds[0][0]) / width;
      const heightScale = (bounds[1][1] - bounds[0][1]) / height;
      const scale = 0.95 / Math.max(widthScale, heightScale);
      const xoffset =
        width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2 + 0;
      const yoffset =
        height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2 + 0;
      const offset = [xoffset, yoffset];
      //   console.log(offset);
      projection.scale(scale).translate(offset);

      const color = d3
        .scaleLinear()
        .domain([1, 20])
        .clamp(true)
        .range(["#595959", "#595959"]);

       // 지역 색상
      function fillFn(d) {
        return color(nameLength(d.pointerId));
      }

      // 지역 이름 길이
      function nameLength(d) {
        const n = nameFn(d);
        return n ? n.length : 0;
      }
      // 지역 이름
      function nameFn(d) {
        return d && d.properties ? d.properties.CTP_KOR_NM : null;
      }
      mapLayer
        .selectAll("path") // path 태그 전체 선택
        .data(geojson.features) // 선택한 객체에 특징점 데이터 바인드
        .enter() // 대응하는 path 요소가 없는 데이터에 대해 새로운 selection 반환
        .append("path") // 선택된 요소들에 대해 path 태그로 이루어진 요소 생성
        .attr("d", path) // d(svg drawing 속성, path data) 태그에 path 속성 추가
        .attr("vector-effect", "non-scaling-stroke")
        .style("fill", fillFn);
    },
  },
};
</script>

<style lang="scss">
.map-wrapper {
  position: relative;
  text-align: center;
}
</style>

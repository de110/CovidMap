<template>
  <div id="mt-3" class="mt-3">
    <div id="nmap-wrapper" class="nmap-wrapper">
      <svg>
        <g id="map-g" class="map-g"></g>
        <g class="rect"></g>
        <g id="text-g" class="text-g">
          <text
            class="text-wrapper"
            v-for="(item, i) in arr"
            v-bind:key="`item-${i}`"
            font-size="10"
          >
            {{ item.gubun }}
          </text>
        </g>
        <g id="text-gg" class="text-gg">
          <text
            v-for="(item, i) in arr"
            v-bind:key="`item-${i}`"
            font-size="10"
          >
            {{ item.total }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import dayjs from "dayjs";
import { nationwideApi } from '../api/index';

const MAP_GEOJSON = require("../assets/map.json");

export default {
  components: {},
  props: {},
  options: {
    responsive: true,
  },
  data() {
    return {
      data: [],
      arr: [
        "0","0","0","0","0","0",
        "0","0","0","0","0","0",
        "0","0","0","0","0",
      ],     
      range: {
        start: new Date().getTime() - 1 * 24 * 60 * 60 * 1000,
        end: new Date(),
      },
    };
  },
  computed: {},
  watch: {
  },
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

      this.data=await nationwideApi(startCreateDt,endCreateDt);
      
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
    drawMap() {
      const geojson = MAP_GEOJSON;

      // 브라우저 크기
      const divWidth = document.getElementById("nmap-wrapper").clientWidth;
      const width = divWidth < 1000 ? divWidth * 0.9 : 1000;
      const height = width * 1;

      const svg = d3
        .select(".nmap-wrapper")
        .select("svg")
        .attr("width", width)
        .attr("height", height);

      const mapLayer = svg.select("g").classed("map-test", true);
      const textLayer = svg.selectAll("text");
      const textLayer2 = svg.select("#text-gg").selectAll("text");
      const boxLayer = svg
        .select(".rect")
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
      const scale = 0.95 / Math.max(widthScale, heightScale);
      const xoffset =
        width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2 + 0;
      const yoffset =
        height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2 + 0;
      const offset = [xoffset, yoffset];
      projection.scale(scale).translate(offset);

      const _this = this;

      function findCodeByName(d) {
        return d.path[0].__data__.properties.CTP_ENG_NM;
      }
      function clicked(d) {
        var region = "/" + findCodeByName(d);
        _this.$router.push({ path: region });
      }

      function setXplace(d, i) {
        //강원
        if (i == 0) {
          return path.centroid(d)[0] + 20;
        }
        //경기
        else if (i == 1) {
          return path.centroid(d)[0] + 25;
        }
        //경남
        else if (i == 2) {
          return path.centroid(d)[0] - 15;
        }
        //경북
        else if (i == 3) {
          return path.centroid(d)[0] + 25;
        }
        //광주
        else if (i == 4) {
          return path.centroid(d)[0] - 20;
        }
        //대구
        else if (i == 5) {
          return path.centroid(d)[0] - 15;
        }
        //세종
        else if (i == 9) {
          return path.centroid(d)[0] - 20;
        }
        //울산
        else if (i == 10) {
          return path.centroid(d)[0] + 10;
        }
        //인천
        else if (i == 11) {
          return path.centroid(d)[0] - 20;
        }
        //전남
        else if (i == 12) {
          return path.centroid(d)[0] - 25;
        }

        //제주
        else if (i == 14) {
          return path.centroid(d)[0] - 25;
        }
        //충남
        else if (i == 15) {
          return path.centroid(d)[0] - 35;
        }
        //충북
        else if (i == 16) {
          return path.centroid(d)[0] + 5;
        }
        return path.centroid(d)[0];
      }

      function setYplace(d, i) {
        //광주
        if (i == 4) {
          return path.centroid(d)[1] - 25;
        }
        //대구
        else if (i == 5) {
          return path.centroid(d)[1] - 25;
        }
        //대전
        else if (i == 6) {
          return path.centroid(d)[1] - 20;
        }
        //서울
        else if (i == 8) {
          return path.centroid(d)[1] - 35;
        }
        //세종
        else if (i == 9) {
          return path.centroid(d)[1] - 30;
        }
        //전남
        else if (i == 12) {
          return path.centroid(d)[1] + 5;
        }
        //전북
        else if (i == 13) {
          return path.centroid(d)[1] - 15;
        }
        //제주
        else if (i == 14) {
          return path.centroid(d)[1] - 25;
        }
        //충북
        else if (i == 16) {
          return path.centroid(d)[1] - 35;
        }
        return path.centroid(d)[1] - 13;
      }

      // 지도 그리기
      mapLayer
        .selectAll("path") // path 태그 전체 선택
        .data(geojson.features) // 선택한 객체에 특징점 데이터 바인드
        .enter() // 대응하는 path 요소가 없는 데이터에 대해 새로운 selection 반환
        .append("path") // 선택된 요소들에 대해 path 태그로 이루어진 요소 생성
        .attr("d", path) // d(svg drawing 속성, path data) 태그에 path 속성 추가
        .attr("vector-effect", "non-scaling-stroke")
        .style("fill", "#D32F2F")
        .on("click", clicked);

      boxLayer
        .selectAll("rect")
        .data(this.arr)
        .enter()
        .append("rect")
        .attr("width", "30")
        .attr("height", "30")
        .data(geojson.features)
        .attr("x", setXplace)
        .attr("y", setYplace)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "white")
        .on("click", clicked);

      textLayer
        .data(geojson.features)
        .attr("x", function(d, i) {
          return setXplace(d, i) + 5;
        })
        .attr("y", function(d, i) {
          return setYplace(d, i) + 13;
        })
        .attr("fill", "black")
        .on("click", clicked);

      textLayer2
        .data(geojson.features)
        .attr("x", function(d, i) {
          return setXplace(d, i) + 5;
        })
        .attr("y", function(d, i) {
          return setYplace(d, i) + 25;
        })
        .attr("fill", "black")
        .on("click", clicked);
    },
  },
};
</script>

<style lang="scss">
.mt-3 {
  // padding-top: 20px;
  padding: 30px;
}
.nmap-wrapper {
  position: relative;
  text-align: center;
  border: 1.5px solid lightgray;
  border-radius: 10px;

  .map-test {
    stroke-width: 1px;
  }
  .rect {
    // filter: drop-shadow(0px 0px 2px lightgray);
    filter: drop-shadow(0px 0px 2px #fdd0d3);
  }
  .map-g {
    stroke: #ffffff;
    stroke-width: 1px;
  }
}
</style>

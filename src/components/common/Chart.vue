<template>
  <div ref="chartDom" class="chart-block"></div>
</template>

<script>
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
import echarts from "echarts";

export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    autoResize: {
      default: false
    }
  },
  watch: {
    option(val) {
      this.chart.setOption(val, { notMerge: true, lazyUpdate: true });
    }
  },
  created() {
    if (this.autoResize) {
      this.resize = debounce(this.resize, 300);
    }
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("chart-resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      // if (this.option.theme) {
      //   this.chart = echarts.init(this.$refs.chartDom, this.option.theme);
      // } else {
      //   this.chart = echarts.init(this.$refs.chartDom);
      // }
      this.chart = echarts.init(this.$refs.chartDom, null, { renderer: "svg" });
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style scoped></style>

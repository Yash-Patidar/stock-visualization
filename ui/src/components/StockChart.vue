<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import { createChart } from "lightweight-charts";

export default {
  name: "StockChart",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartContainer = ref(null);
    const chart = ref(null);
    const candlestickSeries = ref(null);

    const resizeChart = () => {
      if (chart.value && chartContainer.value) {
        chart.value.resize(
          chartContainer.value.clientWidth,
          chartContainer.value.clientHeight
        );
      }
    };

    onMounted(() => {
      chart.value = createChart(chartContainer.value);
      candlestickSeries.value = chart.value.addCandlestickSeries();
      updateChartData(props.data);

      window.addEventListener("resize", resizeChart);
      resizeChart();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeChart);
    });

    watch(props, (newProps) => {
      updateChartData(newProps.data);
    });

    const updateChartData = (data) => {
      if (candlestickSeries.value && Array.isArray(data)) {
        console.log(data, "entry");
        candlestickSeries.value.setData(
          data.map((entry) => ({
            time: new Date(entry.time).getTime() / 1000, // Convert to UNIX timestamp
            open: entry.open,
            high: entry.high,
            low: entry.low,
            close: entry.close,
          }))
        );

        // Set the visible range to fit the data
        if (data.length > 0) {
          const firstDataPoint = data[0];
          const lastDataPoint = data[data.length - 1];
          chart.value.timeScale().setVisibleRange({
            from: new Date(firstDataPoint.time).getTime() / 1000,
            to: new Date(lastDataPoint.time).getTime() / 1000,
          });
        }
      }
    };

    return {
      chartContainer,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 80%;
  height: 80vh; /* Adjust this value as needed */
  margin: 0 auto;
}
</style>

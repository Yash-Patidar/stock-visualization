<template>
  <div class="app-container p-4">
    <!-- App Name -->
    <h1 class="text-2xl font-bold mb-6">Stock Visualization</h1>

    <!-- Stock Instrument Input, Data Interval Dropdown, and Fetch Data Button -->
    <div
      class="controls flex md:flex-row flex-col md:space-x-4 space-x-0 space-y-4 md:space-y-0 items-center"
    >
      <StockInput
        :stock-symbol="stockSymbol"
        @update:stock-symbol="stockSymbol = $event"
        class="flex-grow"
      />

      <IntervalDropdown
        :selected-interval="timeInterval"
        @interval-changed="updateTimeInterval"
        class="flex-grow"
      />

      <FetchButton @fetch-data="handleDataFetch" class="flex-grow" />
    </div>
    <br />
    <!-- Stock Chart Display -->
    <StockChart :data="stockData" />
  </div>
</template>

<script>
import axios from "axios"; // Import axios
import StockInput from "./components/StockInput.vue";
import IntervalDropdown from "./components/IntervalDropdown.vue";
import FetchButton from "./components/FetchButton.vue";
import StockChart from "./components/StockChart.vue";

axios.defaults.baseURL = "http://localhost:3000";

export default {
  components: {
    StockInput,
    IntervalDropdown,
    FetchButton,
    StockChart,
  },
  data() {
    return {
      stockSymbol: "AAPL", // Set a default stock symbol
      timeInterval: "day",
      stockData: [], // Initialize as an empty array
    };
  },
  methods: {
    updateTimeInterval(newInterval) {
      this.timeInterval = newInterval;
    },
    async handleDataFetch() {
      try {
        console.log(
          this.stockSymbol,
          this.timeInterval,
          "stockSymbol, timeInterval"
        );
        const response = await axios.get(`/api/search`, {
          params: {
            symbol: this.stockSymbol,
            period: this.timeInterval,
          },
        });
        // Sort the data in ascending order based on the time attribute
        // this.stockData = response.data.sort(
        //   (a, b) => new Date(a.time) - new Date(b.time)
        // );

        const sortedData = response.data.sort(
          (a, b) => new Date(a.time) - new Date(b.time)
        );
        //

        console.log(this.stockData, "previous");
        this.stockData = sortedData;
        console.log(this.stockData, "after");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.handleDataFetch(); // Fetch data for the default stock symbol when component is mounted
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100;
  padding: 20px;
}
</style>

<template>
  <div class="mb-4">
    <label
      for="data-interval"
      class="block text-gray-700 text-sm font-bold mb-2"
    >
      Data Interval:
    </label>
    <select
      id="data-interval"
      :value="selectedInterval"
      @change="onIntervalChange"
      class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="day">Daily</option>
      <option value="hour">Hourly</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ["selected-interval"],
  methods: {
    onIntervalChange(event) {
      this.$emit("interval-changed", event.target.value);
    },
  },
};
</script>

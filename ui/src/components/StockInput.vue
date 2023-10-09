<template>
  <div>
    <label
      for="stock-instrument"
      class="block text-red-700 text-sm font-bold mb-2"
    >
      Stock Instrument:
    </label>
    <input
      id="stock-instrument"
      :value="stockSymbol"
      @input="$emit('update:stock-symbol', $event.target.value)"
      type="text"
      placeholder="Enter stock symbol"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
</template>

<script>
export default {
  props: ["stock-symbol"],
};
</script>

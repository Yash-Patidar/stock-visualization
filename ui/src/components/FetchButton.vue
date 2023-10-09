<!-- FetchButton.vue -->
<template>
  <div>
    <button
      @click="fetchData"
      class="bg-blue-500 md:mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Fetch Data
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    fetchData() {
      // Emit an event to the parent component to handle the fetching
      this.$emit("fetch-data");
    },
  },
};
</script>

<template>
  <q-card class="card-wrapper"
    ><apexchart
      type="line"
      height="450"
      :options="chartOptions"
      :series="series"
    ></apexchart
  ></q-card>
</template>

<script setup>
import { computed } from "vue";
import { useChartStore } from "src/stores/charts";

const chartStore = useChartStore();

let chartOptions = computed(() => chartStore.chartOptions);
let series = computed(() => chartStore.series);
</script>

<style lang="scss" scoped>
</style>

<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-md row--justify-content">
      <DataFilters class="filter" />
    </div>
    <div
      class="charts row q-mb-md row--justify-content"
      v-if="chartStore.allSeries.length"
    >
      <MonitoringCharts class="monitoring-charts" :typeOfUnites="'time'" />
      <MonitoringCharts class="monitoring-charts" :typeOfUnites="'quantity'" />
    </div>
  </q-page>
</template>

<script setup>
import MonitoringCharts from "../components/Charts/MonitoringCharts.vue";
import DataFilters from "../components/Charts/DataFilters.vue";
import ShowFilters from "../components/Charts/ShowFilters.vue";
import { useChartStore } from "src/stores/charts";

const chartStore = useChartStore();
</script>

<style scoped>
.filter {
  align-self: flex-start;
}

.row--justify-content {
  flex-wrap: wrap;
  justify-content: center;
}
.monitoring-charts {
  min-width: 600px;
  margin-right: 50px;
  margin-bottom: 40px;
}
@media screen and (max-width: 600px) {
  .monitoring-charts {
    min-width: 0;
    margin-right: 0;
  }

  .charts {
    flex-direction: column;
  }
}
</style>

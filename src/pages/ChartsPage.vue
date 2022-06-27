<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-md row--justify-content">
      <DataFilters class="filter" />
      <ShowFilters class="filter" />
    </div>
    <div class="row q-mb-md row--justify-content">
      <MonitoringCharts class="monitoring-charts" :typeOfUnites="'time'" />
      <MonitoringCharts class="monitoring-charts" :typeOfUnites="'quantity'" />
    </div>
  </q-page>
</template>

<script setup>
import MonitoringCharts from "../components/Charts/MonitoringCharts.vue";
import DataFilters from "../components/Charts/DataFilters.vue";
import ShowFilters from "../components/Charts/ShowFilters.vue";
</script>

<style scoped>
.filter {
  align-self: flex-start;
}

.row--justify-content {
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
}
</style>

<template>
  <q-page class="q-pa-md">
    <div
      class="
        fit
        row
        wrap
        justify-center
        items-start
        content-center
        q-gutter-y-lg
      "
    >
      <DataFilters class="filters-wrapper" />
      <MonitoringCharts class="monitoring-charts" />
    </div>
  </q-page>
</template>

<script setup>
import MonitoringCharts from "../components/Charts/MonitoringCharts.vue";
import DataFilters from "../components/Charts/DataFilters.vue";
</script>

<style scoped>
.filters-wrapper {
  margin-right: 50px;
  max-width: 350px;
}

.monitoring-charts {
  min-width: 600px;
}
@media screen and (max-width: 600px) {
  .filters-wrapper {
    margin-right: 0;
  }

  .monitoring-charts {
    min-width: 0;
  }
}
</style>
